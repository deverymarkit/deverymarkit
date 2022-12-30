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


export default function PostModify() {
    const [profileImg, setProfileImg] = useState(); 
    const [userToken, setUserToken] = useState("");
    const [userId, setUserId] = useState("");
    const [imageFileList, setImageFileList] = useState([]); // 이미지 리스트 
    const [imgUrl, setImgUrl] = useState(); // 이미지 서버에서 받아오기
    const [IsValue, setIsValue] = useState(false); // 저장 버튼 활성화를 위해 게시글 작성 유무
    const textarea = useRef();
    const inpRef = useRef();
    const navigate = useNavigate();
    const { postid } = useParams();
    
    useEffect(() => {
        // 프로필 이미지 
        const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
        const userToken = loginInfo.token;
        const userId = loginInfo.accountname;
        setUserId(userId);
        setUserToken(userToken);
        const getUserProfile = async () => {
            try {
                const profileRes = await customAuthAxios.get("/user/myinfo")
                
                setProfileImg(profileRes.data.user.image);
            } catch (err) {
                console.log(err);
            }
        };
        
        const url = BaseURL + `/post/${postid}`;
    
        const getUserPost = async function () {
        try {
            const postRes = await axios.get(
                url,
                {
                "headers": {
                "Authorization": `Bearer ${userToken}`,
                "Content-type": "application/json",
                    },
                },
            );

            console.log(postRes.data);
                setImageFileList(postRes.data.post.image.split(","));
                textarea.current.value=(postRes.data.post.content);
            } catch (error) {
                console.log(error);
            }
        };
            
        

        getUserProfile();
        getUserPost();
    }, []);



    


    const handleResizeHeight = () => {
        textarea.current.style.height = "auto";
        textarea.current.style.height = `${textarea.current.scrollHeight}px`;
        
        textarea.current.value? setIsValue(true) : setIsValue(false);
    };

    const handleRemoveImg = (e) =>{
        // URL.revokeObjectURL(imageFileList[e.target.id]);
        setImageFileList(imageFileList.filter(x => x !== imageFileList[e.target.id]));
    };


    const uploadImg = async () => {
        let formData = new FormData();
        const url = BaseURL + "/image/uploadfiles";

        
        const imgFiles = imageFileList;
        for (let i = 0; i < imgFiles.length; i++) {
            const file = imgFiles[i];
            formData.append('image', file);
        }
        try {
            const postRes = await axios.post(
                url,
                formData
                );
                const PostUpdata = (await postRes).data;
                const imgUrls = PostUpdata
                            .map((file) => BaseURL + file.filename)
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
        // uploadImg();
    };
        // 업로드 기능
        const handleSaveBtn = async (e) =>{
            if(IsValue){
                
                const imgUrl = await uploadImg();
                console.log(imgUrl);
                const url = BaseURL + "/post";
                try {
                    await axios.post(
                        url,
                        {
                            post: {
                                content: textarea.current.value,
                                image: imgUrl,
                            },
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${userToken}`,
                                'Content-type': 'application/json',
                            },
                        }
                        );
                        navigate(`/profile/${userId}`)
                        
                }catch(err) {
                    console.log(err)
                }
            };
        }
    
    return (
        <>
                <Header type="upload" IsValue = {IsValue} handleHeaderBtn = {handleSaveBtn}/>
                <div className={style.wrap_upload}>
                    <div className={style.cont_content}>
                        <ProfileCard profileState="upload" profileImg={profileImg}/>
                        <textarea
                            className={style.text_upload}
                            type="text"
                            placeholder="게시글 입력하기..."
                            onChange={handleResizeHeight}
                            ref={textarea}
                            required
                        />
                    </div>
                    {/* <UploadPhoto imageFileList={imageFileList} handleRemoveImg={handleRemoveImg}/> */}
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
            </div>
        </>
    );
}
