import React from "react";

import BASE_URL from "../common/BaseURL";
import style from "./follow.module.css";

export default function FollowBtn({ isfollow, accountname }) {

    //const postFollow = async () => {
    //    const url = BASE_URL + `/profile/${accountname}/follow`;
        
    //    try {
    //        const postRes = axios.post(url, {
    //            "headers": {
    //                "Authorization": `Bearer ${token}`,  
    //                "Content-type": "application/json",
    //            }
    //        })
    //        const result = await postRes;
    //        setPostList(result.data.post);
    //    } catch(err) {
    //        console.error(err);
    //    }
    //}
    
    //useEffect(()=>{
    //    postFollow();
    //}, [])
   

    return (
        <>
            <button type="button" className={style.btn_follow}>{isfollow ? "팔로잉" : "팔로우"}</button>
        </>
    )
}
