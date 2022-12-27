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
    }, [commentList]);

    const handleComment = async () => {
        if (isValid) {
            try {
                const commentRes = await customAuthAxios.post(`/post/${post.id}/comments`, {
                    comment: {
                        content: nowComment
                    }
                });

                setCommentList(commentRes.data.comment);
            } catch (err) {
                console.error(err);
            }
        } 
    }

    const handleTyping = (e) => {
        setNowComment(e.target.value);
        //console.log(e.target.value);
        e.target.value ? setIsValid(true) : setIsValid(false);
        //console.log("test",isValid);
    }


    return (
        !isloading ? (
            <div className={style.box_comment}>
                {
                    commentList.length > 0 && <CommentList commentList={commentList}/>
                }
                <div className={style.box_commentInput}>
                    <BasicProfileImg type="comment_list" profileImg={noProfileImg}/>
                    <input className={style.inp_comment} type="text" placeholder="댓글 입력하기..." onChange={handleTyping}/>
                    <button className={style.btn_commentInput} onClick={handleComment}>게시</button>
                </div>
            </div>
        ) : null
    );
}
