import { React, useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { darcula, darculaInit } from '@uiw/codemirror-theme-darcula';

import style from "./upload.module.css";
import UploadImg from "../../assets/imgs/upload-img.png";
import UploadPhoto from "../../components/uploadPhoto/UploadPhoto";
import Header from "../../components/common/header/Header";
import ProfileCard from "../../components/common/card/ProfileCard";
import BASE_URL from "../../components/common/BaseURL";
import { customAuthAxios } from "../../api/customAxios";
import { customImgAxios } from "../../api/customAxios";
import Loading from "../Loading";
import Page404 from "../Page404";

export default function PostModify() {

    const [isLoading, setIsLoading] = useState(true);
        
     //토큰 가져오기
    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const token = loginInfo.token;
    const myAccountname = loginInfo.accountname
    const [profileImg, setProfileImg] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [editorOpen, setEditorOpen] = useState(false);
    const [postText, setPostText] = useState("");
    const [IsValue, setIsValue] = useState(false); // 저장 버튼 활성화를 위해 게시글 작성 유무
    const [resizeImage, setResizeImage] = useState();
    const select = useRef();

    const [fileName, setFileName] = useState([]); //api에서 인코딩한 파일이름
    const [previewImgUrl, setPreviewImgUrl] = useState([]); //미리보기 이미지 src
    const [view, setView] = useState("pending");
    const navigate = useNavigate();
    const {postid} = useParams();
    const textRef = useRef();
    const fileRef = useRef();
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [postJson,setPostJson] = useState("");
    const [codeType, setCodeType] = useState();
    const [codeSelected, setCodeSelected] = useState();
    const [content, setContent] = useState("");
    const [ res , getRes ] = useState("");

    //기존 포스트 데이터 요청
    useEffect(() => {
    async function getPost() {
        try {
            const res = await customAuthAxios.get(`/post/${postid}`);

            setPostText(res.data.post.content);
            console.log(res.data.post.content);
            // 코드에디터가 사용 유무 체크
            setIsLoading(false);
            setFileName(res.data.post.image.split(","));

            if (res.data.post.image !== "") 
            {
                setPreviewImgUrl([...res.data.post.image.split(",")]);
            }     
            setView("fulfilled");
        } catch (err) {
            setView("rejected");
            setErrorMsg(err.response.data.message)
            setIsLoading(false);
            console.error(err);
            setIsError(true);
        }
    }
        getPost();
    }, []);
    
    useEffect (()=>{
        if(postText)  {
            setIsValue(true)
            handleResizeHeight();
            if ((postText.includes("editorOpen"))){
                const postJson = JSON.parse(postText);
                setEditorOpen(true);
                setPostJson(true);
                setPostText(postJson.content);
                getRes(postJson.code);
                setCodeSelected(postJson.codeType);
                handleHightingCode(postJson.codeType)
            }
        }
        else setIsValue(false);
    },[postText])

    const handleResizeHeight = (e) => {

        textRef.current.style.height = "auto";
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
    
    const handleText = (e) => {
        setPostText(e.target.value);
        if (e.target.value) {
            setIsActive(true);
        } else if (!e.target.value && fileName.length === 0) {
            setIsActive(false);
        }
    }

    // 작성자 프로필 이미지 로딩
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const profileRes = await customAuthAxios.get("/user/myinfo")
                
                setProfileImg(profileRes.data.user.image);
            } catch (err) {
                console.log(err);
            }
        };
        myAccountname && getUserProfile();
    }, [myAccountname]);

    //이미지 파일 업로드
    function handleImgInput(e) {
        if(fileName[0]===""){
            fileName.pop()
        }
        const loadImg = e.target.files[0];
        imageCompression(loadImg, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
        }).then((compressedFile) => {
        const newFile = new File([compressedFile], loadImg.name, {type: loadImg.type});
        setResizeImage(newFile);
        })
        
    }

    useEffect(()=>{
        if(resizeImage){
            const formData = new FormData();
            formData.append("image", resizeImage);
        if (fileName.length < 3) {
            getImgUrl(formData, resizeImage);
        } else {
            alert("3개 이하의 파일을 업로드 해주세요.");
        }
            
        }
    },[resizeImage])

    //이미지 파일 인코딩된 스트링 데이터 얻기
    async function getImgUrl(formData, resizeImage) {
        setView("pending")
        try {
            const res = await customImgAxios.post("/image/uploadfiles", formData);
            if(fileName){
                setFileName([
                ...fileName,
                BASE_URL +"/"+ res.data[0].filename,
                ]);
            }else{
                setFileName([
                    BASE_URL +"/"+ res.data[0].filename,
                ]);    
            }
            preview(resizeImage);
            
        } catch (err) {
            console.log(err);
        }
    }
    
    //이미지 파일 미리보기
    function preview(loadImg) {
        const reader = new FileReader();
        reader.readAsDataURL(loadImg);
        reader.onload = () => {
            setPreviewImgUrl([...previewImgUrl, reader.result]);
        };
        setView("fulfilled")
        setIsActive(true);
    }
        

    //이미지 미리보기 및 파일 삭제
    function deletePreview(e) {
        setPreviewImgUrl(
            previewImgUrl.filter((el, idx) => e.target.id !== String(idx))
        );
        setFileName(fileName.filter((el, idx) => e.target.id !== String(idx)));
        if (textRef.current.value.length === 0 && fileName.length <= 1) {
            setIsActive(false);
        }
        fileRef.current.value = "";
    }

        const getContent = () => {
        if(editorOpen){
            setContent(
                JSON.stringify({   
                    content : postText,
                    editorOpen : editorOpen,
                    codeType : codeSelected,
                    code : res
                })
            )
        }else{
            setContent(
                postText
            )
        }
    }

    useEffect(()=>{
        getContent();
    },[postText, editorOpen, codeSelected, res])

    //게시글 업로드 버튼 클릭 시 PUT
    function handleSubmit(e) {
        e.preventDefault();
        if(IsValue){
            const postData = {
                post: {
                content: content,
                image: fileName.join(","),
                },
            };
            async function update() {
                try {
                    const res = await customAuthAxios.put(`/post/${postid}`, postData)
                } catch (err) {
                    console.error(err);
                    setView("rejected");
                }
            }
            postData && update();
            navigate(`/profile/${myAccountname}`);
            }
        }

        //코드에디터

    const onChange = useCallback((value, viewUpdate) => {
        getRes(value)
    }, []); 

    const handleEditor = () =>{
        editorOpen ? setEditorOpen(false) : setEditorOpen(true)
        setCodeType()
    }

    const handleCodeChange = (e)=>{
        
        setCodeSelected(e.target.value)
    }
    
    useEffect(() => {
        handleHightingCode();
    }, [codeSelected])

    const handleHightingCode = () => {
        
        switch(codeSelected) {
            case 'html':  
            setCodeType(
                [langs.html()]
                );
                break;
            case 'javascript': 
            setCodeType(
                [langs.java()]
                );
                break;
            case 'sql': 
            setCodeType(
                [langs.java()]
                );
                break;
            case 'python': 
                setCodeType(
                [langs.java()]
                );
                break;
            case 'java': 
                setCodeType(
                [langs.java()]
                );
                break;    
            case 'typescript': 
                setCodeType(
                [langs.tsx()]
                );
                break;    
            case 'jsx': 
                setCodeType(
                [langs.jsx()]
                );
                break;    
            case 'c': 
                setCodeType(
                [langs.c()]
                );
                break;
            case 'c++': 
                setCodeType(
                [langs.cpp()]
                );
                break;
            case 'css': 
                setCodeType(
                [langs.css()]
                );
                break;            
            case 'default': 
            setCodeType(
                
                );
                break;     
            default:
                break;
        }
    }

    if(isLoading) {
        return <Loading />
    }else if (isError){
        return <Page404 errorMsg={errorMsg}/>
    }  
    else {
        return(
        <>
            <Header type="upload"  IsValue={IsValue} handleHeaderBtn = {handleSubmit}/>
            <div className={style.wrap_upload}>
                <div className={style.cont_content}>
                    <ProfileCard profileState="upload" profileImg={profileImg}/>
                    <textarea
                        className={style.text_upload}
                        type="text"
                        placeholder="게시글 입력하기"
                        onChange={handleText}
                        onInput={handleResizeHeight}
                        value={postText}
                        ref={textRef}
                        required
                    />
                </div>
                <div className={style.code_cont}>
                        <div>
                            <span>코드 에디터</span>
                                <label className={style.code_label}>
                                <input  role="switch" type="checkbox" onClick={handleEditor}/>
                            </label>
                        </div>
                            
                        {editorOpen && <select name="selectCode" ref={select} className={style.code_select} onChange={handleCodeChange}>
                        <option value = "default">text</option>
                                            <option value = "html">html</option>
                                            <option value = "css">css</option>
                                            <option value = "java">java</option>
                                            <option value = "c">c</option>
                                            <option value = "c++">c++</option>
                                            <option value = "sql">sql</option>
                                            <option value = "javascript">javascript</option>
                                            <option value = "typescript">typescript</option>
                                            <option value = "jsx">jsx</option>
                                            <option value = "python">python</option>
                                        </select>}
                    </div>
                {editorOpen &&  
                            <CodeMirror
                                value={res}
                                height="200px"
                                width='390px'
                                extensions={codeType}
                                onChange={onChange}
                                theme={darculaInit({
                                    settings: {
                                        lineHighlight: "transparent",
                                        caret: "#c6c6c6",
                                        fontFamily: "monospace",
                                        gutterBackground:"#181226"
                                    },
                                })
                            }
                            />
                        }
                <UploadPhoto type = "modi" imageFileList={previewImgUrl} handleRemoveImg={deletePreview}/>
                {view === "pending" ?<marquee   className={style.p_uploadImg}
                                                scrollamount="10">이미지 업로드 중</marquee>  : ""}

                <input
                    className="ir"
                    type="file"
                    accept="image/*"
                    // name="image"
                    
                    onChange={handleImgInput}
                    ref={fileRef}
                    id="input-file"
                />
                <label htmlFor="input-file">
                    <img
                        className={style.btn_upload}
                        src={UploadImg}
                        alt="업로드 버튼"
                    />
                </label> 
            </div>
            
        </>)
    }
}

