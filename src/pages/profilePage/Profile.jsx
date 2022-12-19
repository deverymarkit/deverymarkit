import React from "react";

import BasicHeader from "../../components/common/header/BasicHeader";
import Navbar from "../../components/common/navbar/Navbar";
import UserInfo from "../../components/profile/UserInfo";
import Product from "../../components/product/Product";
import Post from "../../components/post/Post";
import style from "./profile.module.css";

export default function Profile() {
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