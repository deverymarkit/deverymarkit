import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { customAuthAxios } from "../../api/customAxios";
import Header from "../../components/common/header/Header";
import Navbar from "../../components/common/navbar/Navbar";
import UserInfo from "../../components/profile/ProfileInfo";
import Product from "../../components/product/Product";
import Post from "../../components/post/Post";
import style from "./profile.module.css";

export default function Profile() {

    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const loginAccountName = loginInfo.accountname;
    const { accountname } = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState("");

    let profileType = "";

    if (loginAccountName === accountname) {
        profileType = "my";
    } else {
        profileType = "your";
    }


    const getProfileInfo = async () => {
        try {
            const result = await customAuthAxios.get(`/profile/${accountname}`);
            setProfileInfo(result.data.profile);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    }

    //const getProfileInfo = async () => {
    //    const url = BASE_URL + `/profile/${accountname}`;
        
    //    try {
    //        const profileRes = axios.get(url, {
    //            "headers": {
    //                "Authorization": `Bearer ${token}`,
    //                "Content-type": "application/json"
    //            }
    //        })
    //        const result = await profileRes;
    //        setProfileInfo(result.data.profile);
    //        setIsLoading(false);
    //    } catch(err) {
    //        console.error(err);
    //        setIsLoading(false);
    //    }
    //}
    
    useEffect(() => {
        getProfileInfo();
    }, [accountname])

    /**
     * 1. undefined방지를 위한 loading, error state관리 필요
     * 2. localstorage정보가 없으면 접근할 수 없는 페이지 입니다. 필요
     */

    //if(isLoading) {
    //    return <></>
    //} else if(error) {

    //} else {

    return (
        <>
            <Header type="profile"/>
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
            <Navbar type={profileType === "my" ? "profile" : ""} />
        </>
    )
}