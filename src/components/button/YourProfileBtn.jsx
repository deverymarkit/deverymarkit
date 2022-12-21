import React from 'react'

import userInfoStyle from "../profile/userInfo.module.css";

export default function YourProfileBtn({ isfollow, setProfileInfo }) {
    return (
        <>
            <button>채팅</button>
            <button type="button" onClick={setProfileInfo}>{isfollow}</button>
            <button>공유하기</button>
        </>
    )
}
