import React, { useState, useEffect } from "react";

import { customAuthAxios } from "../../api/customAxios";
import CommentList from "./CommentList";
import BasicProfileImg from "../common/BasicProfileImg";
import style from "./comment.module.css";

import noProfileImg from "../../assets/imgs/profile-none.png";


export default function Comment({ post }) {

    const [commentList, setCommentList] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [nowComment, setNowComment] = useState("");
    const [isValid, setIsValid] = useState(false);

    const getCommentList = async () => {
        try {
            const commentRes = await customAuthAxios.get(`/post/${post.id}/comments`);
            setCommentList(commentRes.data.comments);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getCommentList();
    }, []);
    
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
                getCommentList();
                setNowComment("");
            } catch (err) {
                console.error(err);
            }
        } 
    }

    return (
        !isloading ? (
            <div className={style.box_comment}>
                {
                    commentList.length > 0 && <CommentList commentList={commentList}/>
                }
                <div className={style.box_commentInput}>
                    <BasicProfileImg type="comment_list" profileImg={noProfileImg}/>
                    <input className={style.inp_comment} type="text" placeholder="댓글 입력하기..." value={nowComment} onChange={handleTyping}/>
                    <button className={style.btn_commentInput} onClick={handleComment}>게시</button>
                </div>
            </div>
        ) : "로딩중입니다"
    );
}
