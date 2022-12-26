import { React, useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import style from "./upload.module.css";
import UploadImg from "../../assets/imgs/upload-img.png";
import UploadPhoto from "../../components/uploadPhoto/UploadPhoto";
import Header from "../../components/common/header/Header";
import ProfileCard from "../../components/common/card/ProfileCard";
import axios from "axios";
import BaseURL from "../../components/common/BaseURL";

export default function Upload() {
    const [profileImg, setProfileImg] = useState(); 
    const [userToken, setUserToken] = useState("");
    const [imageFileList, setImageFileList] = useState([]); // 이미지 리스트 
    const [imgUrl, setImgUrl] = useState(); // 이미지 서버에서 받아오기
    const [IsValue, setIsValue] = useState(false); // 저장 버튼 활성화를 위해 게시글 작성 유무
    const textarea = useRef();
    const inpRef = useRef();
    const navigate = useNavigate();
    const { postId } = useParams();
    
    useEffect(() => {
        // 프로필 이미지 
        const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
        const userToken = loginInfo.token;
        setUserToken(userToken);
        const getUserProfile = async () => {
            const url = BaseURL + "/user/myinfo";

            try {
                const res = await axios(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`,
                        "Content-type": "application/json",
                    },
                });
                setProfileImg(res.data.user.image);
            } catch (err) {
                console.log(err);
            }
        };
        getUserProfile();
    }, []);

    // useEffect(() => {
    // 수정 기능
    //     if (postId) {
    //         let postId = "63a8e26217ae6665810627fb"
    //         const url = BaseURL + `/post/detail/${postId}`;
            
    //         const getUserPost = async function () {
    //         try {
    //             const postRes = await axios.get(
    //                 url,
    //             {
    //                 "headers": {
    //                 "Authorization": `Bearer ${userToken}`,
    //                 "Content-type": "application/json",
    //             },
    //             },
    //         );
    //             setImageFileList(postRes.data.post.image.split(","));
    //             textarea.current.value=(postRes.data.post.content);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //         };
    //         getUserPost();
    //     }
    // }, [postId, userToken]);
    


    const handleResizeHeight = () => {
        textarea.current.style.height = "auto";
        textarea.current.style.height = `${textarea.current.scrollHeight}px`;
        
        textarea.current.value? setIsValue(true) : setIsValue(false);
    };

    const handleRemoveImg = (e) =>{
        // URL.revokeObjectURL(imageFileList[e.target.id]);
        setImageFileList(imageFileList.filter(x => x !== imageFileList[e.target.id]));
    };

    // 업로드 기능
    const handleSaveBtn = async (e) =>{
        if(IsValue){
            // const res = await uploadImg();
            // console.log(res);
            const url = BaseURL + "/post";
            try {
                await axios.post(
                    url,
                    {
                        post: {
                            content: textarea.current.value,
                            image: imgUrl,
                            // image : imageFileList.join()
                        },
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${userToken}`,
                            'Content-type': 'application/json',
                        },
                    }
                    );
                    navigate(-1);
                    
            }catch(err) {
                console.log(err)
            }
        };
    }

    const uploadImg = async () => {
        let formData = new FormData();
        const url = BaseURL + "/image/uploadfiles";

        const imgFiles = inpRef.current.files;
        for (let i = 0; i < imgFiles.length; i++) {
            const file = imgFiles[i];
            formData.append('image', file);
        }
        try {
            const postRes = await axios.post(
                url,
                formData
                );
                const PostUpdata = (await postRes).data
                console.log("🚀 ~ file: Upload.jsx:133 ~ uploadImg ~ PostUpdata", PostUpdata)
                    
            console.log(PostUpdata);
            const imgUrls = PostUpdata
                .map((file) => 'https://mandarin.api.weniv.co.kr/' + file.filename)
                .join(",");
            console.log(imgUrls);
            return imgUrls;

            }catch(err) {
                console.log(err)
            }
            
    };


    const storeImage = async ({ target }) => {
        // file 을 "image" 변수에 저장. 이 때 image는 Array!
    const image = target.files;
    if (image.length === 0) {
        let imageList = [...imageFileList];
        setImageFileList(imageList);
    } else if (image.length <= 3){
        // 기존 imageFileList에 저장된 값을 "imageList"에 저장.
        let imageList = [];
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
        const res = await uploadImg();
        setImgUrl(res);
        console.log("🚀 ~ file: Upload.jsx:192 ~ storeImage ~ res", res)
    
    };
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
            </div>
        </>
    );
}
