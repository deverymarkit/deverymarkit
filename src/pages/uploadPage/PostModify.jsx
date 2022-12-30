
import { React, useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import style from "./upload.module.css";
import UploadImg from "../../assets/imgs/upload-img.png";
import UploadPhoto from "../../components/uploadPhoto/UploadPhoto";
import Header from "../../components/common/header/Header";
import ProfileCard from "../../components/common/card/ProfileCard";
import axios from "axios";
import BaseURL from "../../components/common/BaseURL";
import { customAuthAxios } from "../../api/customAxios";
import { customImgAxios } from "../../api/customAxios.js"
import Loading from "../Loading";


export default function PostModify() {

    const [isLoading, setIsLoading] = useState(true);
        
     //토큰 가져오기
    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const token = loginInfo.token;
    const myAccountname = loginInfo.accountname
    const [profileImg, setProfileImg] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [postText, setPostText] = useState("");
    const [IsValue, setIsValue] = useState(false); // 저장 버튼 활성화를 위해 게시글 작성 유무

        const [fileName, setFileName] = useState([]); //api에서 인코딩한 파일이름
        const [previewImgUrl, setPreviewImgUrl] = useState([]); //미리보기 이미지 src
        const [view, setView] = useState("pending");
        const navigate = useNavigate();
        const {postid} = useParams();
        const textRef = useRef();
        const fileRef = useRef();
            //기존 포스트 데이터 요청
            useEffect(() => {
            async function getPost() {
                try {
                    const res = await customAuthAxios.get(`/post/${postid}`);
                setPostText(res.data.post.content);
                setFileName(res.data.post.image.split(","));
                setIsLoading(false)
                if (res.data.post.image == "") {
                    setPreviewImgUrl([]);
                } else {
                    setPreviewImgUrl([...res.data.post.image.split(",")]);
                }
                setView("fulfilled");
                } catch (err) {
                setView("rejected");
                }
            }
            getPost();
            }, []);
            useEffect (()=>{
        (postText) ? setIsValue(true) : setIsValue(false);
        
            },[postText])
        
            function handleResizeHeight() {
            textRef.current.style.height = "auto";
            textRef.current.style.height = textRef.current.scrollHeight + "px";
            textRef.current.value? setIsValue(true) : setIsValue(false);

            }
        
            function handleText(e) {
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
            const loadImg = e.target.files;
            const formData = new FormData();
            formData.append("image", loadImg[0]);
            if (fileName.length < 3) {
                getImgUrl(formData, loadImg);
            } else {
                alert("3개 이하의 파일을 업로드 해주세요.");
            }
            }
        
            //이미지 파일 인코딩된 스트링 데이터 얻기
            async function getImgUrl(formData, loadImg) {
            try {
                const res = await customImgAxios.post("/image/uploadfiles", formData
                );

                
                setFileName([
                ...fileName,
                BaseURL +"/"+ res.data[0].filename,
                ]);
                console.log(loadImg);
                preview(loadImg);
                
            } catch (err) {
                console.log(err);

            }
            }
        
            //이미지 파일 미리보기
            function preview(loadImg) {
            const reader = new FileReader();
            console.log( loadImg);
            reader.readAsDataURL(loadImg[0]);
            reader.onload = () => {
                setPreviewImgUrl([...previewImgUrl, reader.result]);
            };
            console.log("성공");
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
        
            //게시글 업로드 버튼 클릭 시 PUT
            function handleSubmit(e) {
            e.preventDefault();
            if(IsValue){

                const postData = {
                    post: {
                    content: textRef.current.value,
                    image: fileName.join(","),
                    },
                };
                async function update() {
                    try {
                        const res = await customAuthAxios.put(`/post/${postid}`,
                        postData)
                    
                        
                    
                    } catch (err) {
                    console.error(err);
                    setView("rejected");
                    }
                }
                postData && update();
                navigate(`/profile/${myAccountname}`);
                }
            }
        
            if(isLoading) {
                return <Loading />
            } else {
                return(
            <>
                    <Header type="upload"  IsValue={IsValue} handleHeaderBtn = {handleSubmit}/>
                    {view === "fulfilled" && (
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
                        {/* <img src={imgUrl} alt="" /> */}
                        <UploadPhoto type = "modi" imageFileList={previewImgUrl} handleRemoveImg={deletePreview}/>
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
                )}
            </>)
    
        
    }
}
