import React from "react";
import style from "./basicProfileImg.module.css";
import basicImg from "../../assets/imgs/ellipse.png"

export default function BasicProfileImg({ type, profileImg }) {

    let imgType = "";

    const handleImgError = (e) => {
        e.target.src = basicImg
    }

    if (type === "post" || type === "upload") {
        imgType = "box_profile_post";
    } else if (type === "list") {
        imgType = "box_profile_list";
    } else if (type === "comment_list") {
        imgType = "box_profile_comment";
    }

    return (
        <div className={style[imgType]}>
            <img className={style.profile_img} src={profileImg} onError={handleImgError}  alt="프로필 이미지" />
        </div>
    )
}