import React, {useState, useEffect} from "react";
import axios from "axios";

import Comment from "../../components/comment/Comment";
import PostCard from "../../components/common/card/PostCard";
import BaseURL from "../../components/common/BaseURL";
import style from "./postDetail.module.css";

export default function PostDetail() {

    return (
        <>
            {/* <BasicHeader/> */}
            <main>
                <div className="">
                    {/*<PostCard/>*/}
                    <Comment/>
                </div>
            </main>
        </>
    )
}