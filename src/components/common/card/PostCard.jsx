import React from "react";

import ProfileCard from "./ProfileCard";
import style from "./postCard.module.css";
import moreIcon from "../../../assets/imgs/icon-more-vertical.png";
import messageIcon from  "../../../assets/imgs/icon-message-small.svg";
import heartIcon from  "../../../assets/imgs/icon-heart.svg";

export default function PostCard({ id, profileInfo, post, state }) {

    const { username, accountname, image } = profileInfo;

    return (
        <article key={id} className={style.article_post_card}>
            <h3 className="ir">게시글 앨범형 보기</h3>
            <ProfileCard profileImg={image} profileState={state} profileName={username} profileCont={accountname}/>
            <div className={style.cont_post_card}>
                <p className={style.post_contents}>{post.content}</p>
                {
                    post.image ? (
                        <div className={style.box_post}>
                            <img src={post.image} alt=""/>
                        </div>
                    ) : null
                }
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
