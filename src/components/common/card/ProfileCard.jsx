import React from "react";

import BasicProfileImg from "../BasicProfileImg"
import style from "./profileCard.module.css"

export default function ProfileCard({ profileImg, profileState, userName, userCont }) {

    let state = profileState;

    let tesst = "개발의 품격은 없습니다.";


    return (
        <div className={style.cont_profile_card}>
            {
                {
                    post: 
                        <>
                            <BasicProfileImg type="post" profileImg={profileImg}/>
                            <p className={style.post_user_name}>개발 편하게 하고싶어요
                                <span className={style.post_user_id}>@ jinyjiny</span>
                            </p>
                        </>,
                    search:
                        <>
                            <BasicProfileImg type="list" profileImg={profileImg}/>
                            <p className={style.search_user_name}>시몬스같은 시디즈 의자 팔아요
                                <span className={style.search_user_id}>@ sidiz</span>
                            </p>
                        </>,
                    follow:
                        <>
                            <BasicProfileImg type="list" profileImg={profileImg}/>
                            <p className={style.follow_user_name}>개발의 품격
                                <span className={style.follow_user_desc}>{tesst}</span>
                            </p>
                        </>
                }[state]
            }
        </div>
    )
}
