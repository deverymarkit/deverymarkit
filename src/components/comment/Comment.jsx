import React, { useState, useEffect, useRef } from "react";

import { customAuthAxios } from "../../api/customAxios";
import CommentList from "./CommentList";
import BasicProfileImg from "../common/BasicProfileImg";
import Loading from "../../pages/Loading";
import style from "./comment.module.css";

export default function Comment({ post, getPost }) {

    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const loginAccountImage = loginInfo.image;

    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [commentList, setCommentList] = useState([]);
    const [nowComment, setNowComment] = useState("");
    const [skipNumber, setSkipNumber] = useState(0); 
    const [isMore, setIsMore] = useState(false);
    const target = useRef();
    const LIMIT = 10;

    const getCommentList = async () => {
        try {
            const commentRes = await customAuthAxios.get(`/post/${post.id}/comments/?limit=${LIMIT}&skip=${skipNumber}`);
            
            if (skipNumber === 0) {
                setCommentList(commentRes.data.comments);
            } else  {
                setCommentList([...commentList, ...commentRes.data.comments]);
                setIsLoading(false);
                setIsMore(true);
                if (post.commentCount === commentList.length) {
                    setIsMore(false);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getNewCommentList = async () => {
        try {
            const commentRes = await customAuthAxios.get(`/post/${post.id}/comments/?limit=${LIMIT}&skip=0`);
            setCommentList(commentRes.data.comments);
            setIsLoading(false);
            setSkipNumber(0);
            if (commentRes.data.comments.length >= 10) {
                setIsMore(true);
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        getNewCommentList();
    }, [])

    useEffect(() => {
        getCommentList();
    }, [skipNumber])

    const loadMore = () => {
        setSkipNumber(prev => prev + 10)
        
    }

    useEffect(() => {
        if (isMore && target.current) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            })

            observer.observe(target.current)
        }
    }, [isLoading])
    
    const handleTypingComment = (e) => {
        setNowComment(e.target.value);
        e.target.value ? setIsValid(true) : setIsValid(false);
    }

    const handleRegisterComment = async () => {
        if (isValid) {
            try {
                await customAuthAxios.post(`/post/${post.id}/comments`, {
                    comment: {
                        content: nowComment
                    }
                });
                setNowComment("");
                setIsLoading(true);
                getPost();
                getNewCommentList();
            } catch (err) {
                console.error(err);
            }
        } 
    }

    const handleKeyPress = (e) => {
        //if (e.key === "Enter" && e.shiftKey) {
        //    setNowComment(prev => prev + `\n`);
        //} else 
        if (e.key === "Enter") {
            handleRegisterComment();
            e.preventDefault();
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
                    { isMore === true ? <button ref={target}>더보기</button> : null}
                </div>
                <div className={style.box_commentInput}>
                    <BasicProfileImg type="comment_list" profileImg={loginAccountImage}/>
                    <input className={style.inp_comment} type="text" placeholder="댓글 입력하기..." value={nowComment} onChange={handleTypingComment} onKeyDown={handleKeyPress}/>
                    <button type="button" className={style.btn_commentInput} onClick={handleRegisterComment}>게시</button>
                </div>
            </>
        )
    }
}
