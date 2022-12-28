import React from "react";
import { useLocation } from "react-router-dom";

import Comment from "../../components/comment/Comment";
//import CommentList from "../../components/comment/CommentList";

import Header from "../../components/common/header/Header";
import PostCard from "../../components/common/card/PostCard";
import style from "./postDetail.module.css";

export default function PostDetail() {
    const location = useLocation();
    const id = location.state.id;
    const post = location.state.post;

    return (
        <>
            <Header type="post"/>
            <main className={style.wrap_post_detail}>
                <section className={style.cont_post_detail}>
                    <h2 className="ir">게시글 상세보기</h2>
                    <PostCard id={id} post={post}/>
                </section>
                <section className={style.cont_post_comment}>
                    <h2 className="ir">댓글</h2>
                    <Comment post={post}/>
                </section>
            </main>
        </>
    )
}