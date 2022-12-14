import React from "react";
import { useNavigate } from "react-router-dom";

import FollowBtn from "../../button/FollowBtn";
import BasicProfileImg from "../basicProfileImg/BasicProfileImg";
import style from "./profileCard.module.css";

export default function ProfileCard({
    profileImg,
    profileState,
    profileName,
    profileCont,
    profileAccount,
    isfollow,
    handleBtn,
    profileId,
}) {
    const navigate = useNavigate();
    const state = profileState;

    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const loginAccountName = loginInfo.accountname;

    return (
        <>
            {
                {
                    post: (
                        <div
                            className={style.cont_profile_card}
                            onClick={handleBtn}
                        >
                            <BasicProfileImg
                                type="post"
                                profileImg={profileImg}
                            />
                            <p className={style.post_user_name}>
                                {profileName}
                                <span className={style.post_user_id}>
                                    @ {profileCont}
                                </span>
                            </p>
                        </div>
                    ),
                    search: (
                        <div
                            className={style.cont_profile_card}
                            onClick={() => {
                                navigate(`/profile/${profileAccount}`);
                            }}
                        >
                            <BasicProfileImg
                                type="list"
                                profileImg={profileImg}
                            />
                            <p className={style.search_user_name}>
                                {profileName}
                                <span className={style.search_user_id}>
                                    {profileCont}
                                </span>
                            </p>
                        </div>
                    ),
                    follow: (
                        <li className={style.item_follow}>
                            <div
                                className={style.cont_profile_card}
                                onClick={handleBtn}
                            >
                                <BasicProfileImg
                                    type="list"
                                    profileImg={profileImg}
                                />
                                <p className={style.follow_user_name}>
                                    {profileName}
                                    <span className={style.follow_user_desc}>
                                        {profileCont}
                                    </span>
                                </p>
                            </div>
                            {loginAccountName === profileAccount ? null : (
                                <FollowBtn
                                    isfollow={isfollow}
                                    accountname={profileAccount}
                                />
                            )}
                        </li>
                    ),
                    upload: (
                        <div
                            className={style.cont_profile_card}
                            onClick={handleBtn}
                        >
                            <BasicProfileImg
                                type="upload"
                                profileImg={profileImg}
                            />
                        </div>
                    ),
                    comment: (
                        <>
                            <div
                                className={style.cont_profile_card}
                                onClick={handleBtn}
                            >
                                <BasicProfileImg
                                    type="comment_list"
                                    profileImg={profileImg}
                                />
                                <p className={style.p_comment_name}>
                                    {profileName}
                                </p>
                                <span className={style.span_comment_date}>
                                    {profileCont}
                                </span>
                            </div>
                        </>
                    ),
                }[state]
            }
        </>
    );
}
