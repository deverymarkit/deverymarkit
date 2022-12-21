import React from "react";
import style from "./basicProfileImg.module.css";

export default function BasicProfileImg({ type, profileImg }) {

    let imgType = "";

    if (type === "post" || type === "upload") {
        imgType = "box_profile_post";
    } else if (type === "list") {
        imgType = "box_profile_list";
    }

    return (
        <div className={style[imgType]}>
            <img className={style.profile_img} src={profileImg} alt="프로필 이미지" />
        </div>
    )
}
