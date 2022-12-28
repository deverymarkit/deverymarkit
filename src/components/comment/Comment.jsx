import React, { useState, useEffect, useRef } from "react";

import { customAuthAxios } from "../../api/customAxios";
import CommentList from "./CommentList";
import BasicProfileImg from "../common/BasicProfileImg";
import style from "./comment.module.css";

import noProfileImg from "../../assets/imgs/profile-none.png";


export default function Comment({ post }) {

    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const loginAccountImage = loginInfo.image;

    const [commentList, setCommentList] = useState([]);
    const [nowComment, setNowComment] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isloading, setIsLoading] = useState(true);
    const [skipNumber, setSkipNumber] = useState(0); 
    const target = useRef();

    const getCommentList = async () => {
        try {
            const commentRes = await customAuthAxios.get(`/post/${post.id}/comments/?limit=10&skip=${skipNumber}`);
            console.log("여기옴?");
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
        if (!isloading) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            })
            // 옵저버 탐색 시작
            observer.observe(target.current)
        }
    }, [isloading])
    
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

    return (
        !isloading ? (
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
         ) : "로딩중입니다"
    );
}
