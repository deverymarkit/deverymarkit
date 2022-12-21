import React from "react";
import { useNavigate } from "react-router-dom";

import ProfileCard from "./ProfileCard";
import style from "./postCard.module.css";
import moreIcon from "../../../assets/imgs/icon-more-vertical.png";
import messageIcon from  "../../../assets/imgs/icon-message-small.svg";
import heartIcon from  "../../../assets/imgs/icon-heart.svg";

export default function PostCard({ id, post }) {

    const navigate = useNavigate();
    const handlePostDetail = () => {
        navigate(`/post/${post.id}`)
    }

    return (
        <article key={id} className={style.article_post_card}>
            <ProfileCard profileImg={post.author.image} profileState="post" profileName={post.author.username} profileCont={post.author.accountname}/>
            <div className={style.cont_post_card}>
                <div onClick={handlePostDetail}>
                    <p className={style.post_contents}>{post.content}</p>
                    {
                        post.image ? (
                            <div className={style.box_post}>
                                <img src={post.image} alt=""/>
                            </div>
                        ) : null
                    }
                </div>
                <div className={style.box_btn}>
                    <img src={heartIcon} alt="좋아요" />
                    <span className={style.span_count}>{post.heartCount}</span>
                    <img src={messageIcon} alt="댓글" />
                    <span className={style.span_count}>{post.comments.length}</span>
                </div>
                <span className={style.span_post_date}>{post.createdAt}</span>
                <img src={moreIcon} className={style.btn_more} alt="더보기" />
            </div>
        </article>
    )
}
