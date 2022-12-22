import React from "react";

import style from "./profileBtn.module.css";

export default function YourProfileBtn({ isfollow, setProfileInfo }) {
    console.log(isfollow);
    return (
        <>
            <button className={style.box_chat_btn}></button>
            <button type="button" className={`${style.btn_isfollow} ${!isfollow && style.un}`} onClick={setProfileInfo}>{isfollow ? "팔로잉" : "팔로우"}</button>
            <button className={style.box_share_btn}></button>
        </>
    )
}
