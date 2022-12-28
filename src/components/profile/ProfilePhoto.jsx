import React, { useRef } from "react";
import style from "./profilePhoto.module.css"
import uploadImg from "../../assets/imgs/upload-img.png";
import { customImgAxios } from "../../api/customAxios.js"

export default function ProfilePhoto({setProfiledata, profiledata}) {
    const inputRef = useRef();
    
    const handleInputRef = (e) => {
        e.preventDefault();
        inputRef.current.click();
    }

    const handleGetImgUrl = (event) => {
        const image = event.target.files[0];
        getImgUrl(image);
    }

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
