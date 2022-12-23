import React from "react";
import { useNavigate } from "react-router-dom";

import MyProfileBtn from "../button/MyProfileBtn";
import YourProfileBtn from "../button/YourProfileBtn";
import BASE_URL from "../common/BaseURL";
import style from "./profileInfo.module.css";

export default function UserInfo({ profileInfo, setProfileInfo, profileType }) {

    const { username, accountname, intro, image, isfollow, followerCount, followingCount } = profileInfo;

    const navigate = useNavigate();

    const handleFollowersView = () => {
        navigate(`/profile/${accountname}/follower`)
    }

    const handleFollowingView = () => {
        navigate(`/profile/${accountname}/following`)
    }

    return (
        <section className={style.wrap_user_info}>
            <div className={style.cont_user_info}>
                <h2 className="ir">프로필 정보 섹션</h2>
                <div className={style.cont_follow}>
                    <p className={style.p_followers} onClick={handleFollowersView}>
                        {followerCount}
                        <span>followers</span>
                    </p>
                    <div className={style.img_profile}>
                        <img src={image} alt={`${username}님의 프로필 사진`} />
                    </div>
                    <p className={style.p_following} onClick={handleFollowingView}>
                        {followingCount}
                        <span>followings</span>
                    </p>
                </div>
                <span className={style.span_user_name}>{username}</span>
                <span className={style.span_user_id}>@{accountname}</span>
                <span className={style.span_user_intro}>{intro}</span>
                <div className={style.box_btn}>
                    { profileType === "your" ? <YourProfileBtn isfollow={isfollow} setProfileInfo={setProfileInfo}/> : <MyProfileBtn /> }
                </div>
            </div>
        </section>
    )
}
