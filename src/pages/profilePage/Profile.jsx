import React from "react";
//import Axios from "axios";

import BasicHeader from "../../components/common/header/BasicHeader";
import Navbar from "../../components/common/navbar/Navbar";
import UserInfo from "../../components/profile/UserInfo";
import Product from "../../components/product/Product";
import Post from "../../components/post/Post";
import style from "./profile.module.css";

export default function Profile() {

    // accountname, 인증상태

    // authorization필요
    //Axios.get(`https://mandarin.api.weniv.co.kr/profile/${accountname}`)
    //.then((response) => {console.log(response.data)})
    //.catch((error)=>{console.log(error)})

    return (
        <>
            <BasicHeader/>
            <main className={style.main_profile}>
                <UserInfo />
                <Product />
                <Post />
            </main>
            <Navbar/>
        </>
    )
}