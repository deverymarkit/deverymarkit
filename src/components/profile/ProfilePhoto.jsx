import React, { useState, useEffect, useRef } from "react";
import style from "./profilePhoto.module.css"
import uploadImg from "../../assets/imgs/upload-img.png";
import { customImgAxios } from "../../api/customAxios.js"
import imageCompression from "browser-image-compression";

export default function ProfilePhoto({setProfiledata, profiledata}) {
    
    const [resizeImage, setResizeImage] = useState();
    const inputRef = useRef();
    
    const handleInputRef = (e) => {
        e.preventDefault();
        inputRef.current.click();
    }

    const handleGetImgUrl = (event) => {
        const image = event.target.files[0];
        imageCompression(image, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
        }).then((compressedFile) => {
        const newFile = new File([compressedFile], image.name, {type: image.type});
        setResizeImage(newFile);
        });
        
    }

    useEffect(()=>{
        if(resizeImage){
            getImgUrl(resizeImage)
        }
    },[resizeImage])
    

    const getImgUrl = async (image) => {
        const formData = new FormData();
        formData.append('image', image);
        try {
            const imgRes = customImgAxios.post(`/image/uploadfile`, formData)
            const imgUrl = (await imgRes).data.filename
            setProfiledata({...profiledata, "image": `https://mandarin.api.weniv.co.kr/${imgUrl}`})
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className={style.cont_profileImg}>
        <img src={profiledata.image} className={style.img_profileImg} alt="프로필 사진"></img>
        <input type="file" 
            className={style.inp_file} 
            accept="image/*"
            ref={inputRef}
            name="image"
            onChange={handleGetImgUrl}/>
            <div 
            className={style.div_uploadImg} 
            style={{backgroundImage: `url(${uploadImg})`}}
            onClick={handleInputRef}>
            </div>
        </div>
)
}
