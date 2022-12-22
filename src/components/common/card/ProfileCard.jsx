import React from "react";

import BasicProfileImg from "../BasicProfileImg"
import style from "./profileCard.module.css"

export default function ProfileCard({ profileImg, profileState, profileName, profileCont, handleBtn }) {

    const state = profileState;

    return (
        <div className={style.cont_profile_card} onClick={handleBtn}>
            {
                {
                    post: 
                        <>
                            <BasicProfileImg type="post" profileImg={profileImg}/>
                            <p className={style.post_user_name}>{profileName}
                                <span className={style.post_user_id}>@ {profileCont}</span>
                            </p>
                        </>,
                    search:
                        <>
                            <BasicProfileImg type="list" profileImg={profileImg}/>
                            <p className={style.search_user_name}>{profileName}
                                <span className={style.search_user_id}>@ {profileCont}</span>
                            </p>
                        </>,
                    follow:
                        <>
                            <BasicProfileImg type="list" profileImg={profileImg}/>
                            <p className={style.follow_user_name}>{profileName}
                                <span className={style.follow_user_desc}>{profileCont}</span>
                            </p>
                        </>,
                    upload:
                        <>
                            <BasicProfileImg type="upload" profileImg={profileImg}/>
                        </>
                }[state]
            }
        </div>
    )
}
