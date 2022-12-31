import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { customAuthAxios } from "../../api/customAxios";
import Header from "../../components/common/header/Header";
import Comment from "../../components/comment/Comment";
import PostCard from "../../components/common/card/PostCard";
import Loading from "../Loading";
import style from "./postDetail.module.css";

export default function PostDetail() {

    const location = useLocation();
    const postId = location.state.id;

    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    const getPost = async () => {
        try {
            const postRes = await customAuthAxios.get(`/post/${postId}`);
            setPost(postRes.data.post);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getPost();
    }, [])

    if (isLoading) {
        return <Loading />
    } else {
        return (
            <>
                <Header type="post"/>
                <main className={style.wrap_post_detail}>
                    <section className={style.cont_post_detail}>
                        <h2 className="ir">게시글 상세보기</h2>
                        <PostCard post={post}/>
                    </section>
                    <section className={style.cont_post_comment}>
                        <h2 className="ir">댓글</h2>
                        <Comment post={post} getPost={getPost}/>
                    </section>
                </main>
            </>
        )
    }
}