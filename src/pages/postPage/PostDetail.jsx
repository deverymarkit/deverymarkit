import React, {useState, useEffect} from "react";
import axios from "axios";

import Comment from "../../components/comment/Comment";
import PostCard from "../../components/common/card/PostCard";
import BaseURL from "../../components/common/BaseURL";
import style from "./postDetail.module.css";
import Header from "../../components/common/header/Header";

export default function PostDetail() {

    return (
        <>
            <Header type="post"/>
            <main>
                <div className="">
                    {/*<PostCard/>*/}
                    <Comment/>
                </div>
            </main>
        </>
    )
}