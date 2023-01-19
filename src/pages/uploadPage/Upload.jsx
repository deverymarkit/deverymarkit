import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { customAuthAxios } from "../../api/customAxios";
import imageCompression from 'browser-image-compression';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { sql } from '@codemirror/lang-sql';
import { java } from '@codemirror/lang-java';
import { darcula, darculaInit } from '@uiw/codemirror-theme-darcula';

import style from "./upload.module.css";
import UploadImg from "../../assets/imgs/upload-img.svg";
import CodeImg from "../../assets/imgs/coding.png";
import UploadPhoto from "../../components/uploadPhoto/UploadPhoto";
import Header from "../../components/common/header/Header";
import ProfileCard from "../../components/common/card/ProfileCard";
import axios from "axios";
import Loading from "../Loading";
import BaseURL from "../../components/common/BaseURL";

export default function Upload() {
    const [profileImg, setProfileImg] = useState(); 
    const [imageFileList, setImageFileList] = useState([]); // 이미지 리스트 
    const [imgUrl, setImgUrl] = useState(); // 이미지 서버에서 받아오기
    const [IsValue, setIsValue] = useState(false); // 저장 버튼 활성화를 위해 게시글 작성 유무
    const textRef = useRef("");
    const inpRef = useRef();
    const select = useRef();
    const navigate = useNavigate();
    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [editorOpen, setEditorOpen] = useState(false);
    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const userToken = loginInfo.token;
    const userId = loginInfo.accountname;
    const [codeType, setCodeType] = useState();
    const [content, setContent] = useState("");
    const [postText, setPostText] = useState("");
    const [ res , getRes ] = useState("");

    useEffect(() => {
        // 프로필 이미지 
        const getUserProfile = async () => {
        const url = BaseURL + "/user/myinfo";
        try {
            const ProfileRes = await customAuthAxios.get(`/user/myinfo`);
            setProfileImg(ProfileRes.data.user.image);
            setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getUserProfile();
    }, []);

    const handleResizeHeight = (e) => {
        setPostText(e.target.value);
        textRef.current.style.height = "auto";
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        textRef.current.value? setIsValue(true) : setIsValue(false);
    };

    const handleRemoveImg = (e) =>{
        setImageFileList(imageFileList.filter(x => x !== imageFileList[e.target.id]));
    };


    const uploadImg = async () => {
        let formData = new FormData();
        const url = BaseURL + "/image/uploadfiles";
        const imgFiles = imageFileList;
        for (let i = 0; i < imgFiles.length; i++) {
            const file = imgFiles[i];
            const resizeImg =await imageCompression(file, {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1920,
            }).then((compressedFile) => {
            const newFile = new File([compressedFile], file.name, {type: file.type});
            return newFile
            });
            formData.append('image', resizeImg);
        }
        try {
            const postRes = await axios.post(
                url,
                formData
                );
                const PostUpdata = (await postRes).data;
                const imgUrls = PostUpdata
                            .map((file) => 'https://mandarin.api.weniv.co.kr/' + file.filename)
                            .join(",");
                return imgUrls;
            }catch(err) {
                console.log(err)
            }
    };

    const storeImage = async ({ target }) => {
        // file 을 "image" 변수에 저장. 이 때 image는 Array!
        const image = target.files;
        let imageList = [...imageFileList];
        
        if (imageList.length < 3){
            // 기존 imageFileList에 저장된 값을 "imageList"에 저장.
        // imgae 배열의 길이만큼 for문을 돌려주고 배열에 요소를 imageList에 push해준다.
        for (let i = 0; i < image.length; i++) {
            // imageList.push(URL.createObjectURL(image[i]));
            imageList.push(image[i]);            
        }
        // 이렇게 만들어진 imageList 배열을 set!
            setImageFileList(imageList);
        } else{
            alert("사진은 3개 이하로 업로드가능합니다.");
        }
    };

    const getContent = () => {
        if(editorOpen){
            console.log(select.current.value);
            setContent(
                JSON.stringify({   
                    content : postText,
                    editorOpen : editorOpen,
                    codeType : select.current.value,
                    code : res
                })
            )
        }else{
            setContent(
                postText,
            )
        }
    }

    useEffect(()=>{
        getContent();
    },[postText, editorOpen, select, res])

    // 업로드 기능
    const handleSaveBtn = async (e) =>{
        if(IsValue){
            
            const imgUrl = await uploadImg();

            try {
                await customAuthAxios.post(`/post`,{
                    post: {
                        content: content,
                        image: imgUrl,
                    },
                } );
                
                    navigate(`/profile/${userId}`)
                    
            }catch(err) {
                console.log(err)
            }
        };
    }

    //코드에디터

    const onChange = React.useCallback((value, viewUpdate) => {
        getRes(value)
    }, []); 

    const handleEditor = ()=>{
        editorOpen ? setEditorOpen(false) : setEditorOpen(true)
    }

    const handleCodeChange = (e)=>{
        switch(e.target.value) {
            case 'html':  
            setCodeType(
                [html({jsx: true })]
                );
                break;
            case 'javascript': 
            setCodeType(
                [javascript({jsx: true })]
                );
                break;
            case 'sql': 
            setCodeType(
                [sql({jsx: true })]
                );
                break;
            case 'python': 
                setCodeType(
                [python({jsx: true })]
                );
                break;
            case 'java': 
                setCodeType(
                [java({jsx: true })]
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
    
    if (isLoading) {
        return <Loading />
    } else {
        return (
        <>
                <Header type="upload" IsValue = {IsValue} handleHeaderBtn = {handleSaveBtn}/>
                <section className={style.wrap_upload}>
                    <div className={style.cont_content}>
                        <ProfileCard profileState="upload" profileImg={profileImg}/>
                        <textarea
                            className={style.text_upload}
                            type="text"
                            placeholder="게시글 입력하기..."
                            onChange={handleResizeHeight}
                            ref={textRef}
                            required
                        />
                    </div>
                    {editorOpen &&  
                        <div>
                            <select name="selectCode" ref={select} className={style.code_select} onChange={handleCodeChange}>
                                <option value = "default">text</option>
                                <option value = "html">html</option>
                                <option value = "java">java</option>
                                <option value = "sql">sql</option>
                                <option value = "javascript">javascript</option>
                                <option value = "python">python</option>
                            </select>
                            <CodeMirror
                                value=""
                                max-height="2000px"
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
                        </div>}
                    <UploadPhoto imageFileList={imageFileList} handleRemoveImg={handleRemoveImg}/>
                    <input
                        className="ir"
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={storeImage}
                        ref={inpRef}
                        id="input-file"
                        value=""
                        multiple
                    />
                <label htmlFor="input-file">
                    <img
                        className={style.btn_upload}
                        src={UploadImg}
                        alt="업로드 버튼"
                    />
                </label>
                <img
                    onClick={handleEditor}
                    className={style.btn_code}
                    src={CodeImg}
                    alt="에디터 버튼"
                    />
            </section>
        </>
        );
    }
}