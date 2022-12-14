import React from "react";

import MyProfileBtn from "../button/MyProfileBtn";
import YourProfileBtn from "../button/YourProfileBtn";
import userInfoStyle from "./userInfo.module.css";

export default function UserInfo() {

    const userType = "my";

    return (
        <section className={userInfoStyle.wrap_user_info}>
            <div className={userInfoStyle.cont_user_info}>
                {/*<h2>프로필 정보 섹션(ir처리)</h2>*/}
                <div className={userInfoStyle.cont_follow}>
                    <p className={userInfoStyle.p_followers}>
                        2950
                        <span>followers</span>
                    </p>
                    {/* 이미지가 있으면 경로, 없으면 기본이미지 경로 */}
                    <img src="" className={userInfoStyle.img_profile} alt="00님의 프로필사진" />
                    <p className={userInfoStyle.p_followings}>
                        165
                        <span>followings</span>
                    </p>
                </div>
                <span className={userInfoStyle.span_user_name}>굉장한 개발자</span>
                <span className={userInfoStyle.span_user_id}>@jinyjiny</span>
                <span className={userInfoStyle.span_user_intro}>개발 편하게 하고싶어요</span>
                <div className={userInfoStyle.box_btn}>
                    { userType === 'your' ? <YourProfileBtn /> : <MyProfileBtn /> }
                </div>
            </div>
        </section>
    )
}
