import React, { useState, useEffect } from "react";
import axios from "axios";

import BasicHeader from "../../components/common/header/BasicHeader";
import Navbar from "../../components/common/navbar/Navbar";
import UserInfo from "../../components/profile/UserInfo";
import Product from "../../components/product/Product";
import Post from "../../components/post/Post";
import BaseURL from "../../components/common/BaseURL";
import style from "./profile.module.css";

export default function Profile() {

    // 가짜 데이터
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTk2MjYwMTdhZTY2NjU4MWM1ZDA4NCIsImV4cCI6MTY3NjczNzQ1NCwiaWF0IjoxNjcxNTUzNDU0fQ.El8mR-8KPTWI8_kZ7zDgdXmSNpFTslLDAM2ILXLMrKo"
    //const accountname = "jinyjiny";
    const accountname = "heehee";
    //const profileType = "myProfile";
    const profileType = "yourProfile";
    // 가짜 데이터

    const [isLoading, setIsLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState("");

    const getProfileInfo = async () => {
        const url = BaseURL + `/profile/${accountname}`;
        
        try {
            const profileRes = axios.get(url, {
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json",
                }
            })
            const result = await profileRes;
            setProfileInfo(result.data.profile);
            setIsLoading(false);
        } catch(err) {
            console.error(err);
            setIsLoading(false);
        }
    }
    
    useEffect(()=>{
        getProfileInfo();
    }, [accountname])

    //if(isLoading) {
    //    return <></>
    //} else if(error) {

    //} else {

    return (
        <>
            <BasicHeader/>
            <main className={style.main_profile}>
                {
                    isLoading ? "loading" : (
                        <>
                            <UserInfo profileInfo={profileInfo} setProfileInfo={setProfileInfo} profileType={profileType}/>
                            <Product accountname={profileInfo.accountname} profileType={profileType}/>
                            <Post profileInfo={profileInfo} profileType={profileType}/>
                        </>
                    )
                }
            </main>
            <Navbar/>
        </>
    )
}