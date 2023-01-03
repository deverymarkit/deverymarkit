import React from "react";
import { customAuthAxios } from "../../api/customAxios";

import style from "./profileBtn.module.css";

export default function YourProfileBtn({ accountname, isfollow, setProfileInfo }) {

    const handleFollowToggle = () => {
        if (isfollow) {
            const setUnFollow = async () => {
                try {
                    const followRes = await customAuthAxios.delete(`/profile/${accountname}/unfollow`);
                    setProfileInfo(followRes.data.profile);
                } catch (err) {
                    console.error(err);
                }
            }
            setUnFollow();
        } else {
            const setFollow = async () => {
                try {
                    const followRes = await customAuthAxios.post(`/profile/${accountname}/follow`);
                    setProfileInfo(followRes.data.profile);
                } catch (err) {
                    console.error(err);
                }
            }
            setFollow();
        }
    }

    return (
        <>
            <button className={style.box_chat_btn}></button>
            <button type="button" className={`${style.btn_isfollow} ${!isfollow && style.un}`} onClick={handleFollowToggle}>{isfollow ? "팔로잉" : "팔로우"}</button>
            <button className={style.box_share_btn}></button>
        </>
    )
}
