import React, { useState } from "react";

import { customAuthAxios } from "../../api/customAxios";

import style from "./follow.module.css";

export default function FollowBtn({ isfollow, accountname }) {

    const [follow, setIsFollow] = useState(isfollow);

    const handleFollowToggle = () => {
        if (follow) {
            const setUnFollow = async () => {
                try {
                    const followRes = await customAuthAxios.delete(`/profile/${accountname}/unfollow`);
                    setIsFollow(followRes.data.profile.isfollow);
                } catch (err) {
                    console.error(err);
                }
            }
            setUnFollow();
        } else {
            const setFollow = async () => {
                try {
                    const followRes = await customAuthAxios.post(`/profile/${accountname}/follow`);
                    setIsFollow(followRes.data.profile.isfollow);
                } catch (err) {
                    console.error(err);
                }
            }
            setFollow();
        }
    }
   

    return (
        <>
            <button type="button" className={`${style.btn_isfollow} ${!follow && style.un}`} onClick={handleFollowToggle}>{follow ? "팔로잉" : "팔로우"}</button>
        </>
    )
}
