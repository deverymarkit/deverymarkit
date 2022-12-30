import React, { useState, useEffect, useRef } from "react";

import { customAuthAxios } from "../../api/customAxios";
import CommentList from "./CommentList";
import BasicProfileImg from "../common/BasicProfileImg";
import Loading from "../../pages/Loading";
import style from "./comment.module.css";

export default function Comment({ post }) {

    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const loginAccountImage = loginInfo.image;

    const [commentList, setCommentList] = useState([]);
    const [nowComment, setNowComment] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [skipNumber, setSkipNumber] = useState(0); 
    const target = useRef();

    const getCommentList = async () => {
        try {
            const commentRes = await customAuthAxios.get(`/post/${post.id}/comments/?limit=10&skip=${skipNumber}`);
            setCommentList([...commentList, ...commentRes.data.comments]);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getCommentList();
    }, [skipNumber]);

    const loadMore = () => {
        setSkipNumber(prev => prev + 10)
    }

    useEffect(() => {
        if (!isLoading) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            })
            // 옵저버 탐색 시작
            observer.observe(target.current)
        }
    }, [isLoading])
    
    const handleTyping = (e) => {
        setNowComment(e.target.value);
        e.target.value ? setIsValid(true) : setIsValid(false);
    }

    const handleComment = async () => {
        if (isValid) {
            try {
                await customAuthAxios.post(`/post/${post.id}/comments`, {
                    comment: {
                        content: nowComment
                    }
                });
                setNowComment("");
                setCommentList([]);
                setSkipNumber(0);
                getCommentList();
            } catch (err) {
                console.error(err);
            }
        } 
    }

    if(isLoading) {
        return <Loading />
    } else {
        return (
            <>
                <div className={style.box_comment}>
                    {
                        commentList.length > 0 && <CommentList commentList={commentList}/>
                    }
                    <button ref={target}>로딩중</button>
                </div>
                <div className={style.box_commentInput}>
                    <BasicProfileImg type="comment_list" profileImg={loginAccountImage}/>
                    <input className={style.inp_comment} type="text" placeholder="댓글 입력하기..." value={nowComment} onChange={handleTyping}/>
                    <button className={style.btn_commentInput} onClick={handleComment}>게시</button>
                </div>
            </>
        )
    }
}
