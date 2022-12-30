import React from "react";

import ProfileCard from "../common/card/ProfileCard";
import style from "./comment.module.css";
import moreIcon from "../../assets/imgs/icon-more-vertical.png";
import { useNavigate } from "react-router-dom";

export default function CommentList({ commentList }) {

    const navigate = useNavigate();

    const handleProfile = (param) => {
        navigate(`/profile/${param}`);
    }

    const setCommentDate = (createdAt) => {
        const elapsedTime = new Date() - createdAt;

        const seconds = elapsedTime / 1000
        if (seconds < 60) return `방금 전`
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}분 전`
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}시간 전`
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}일 전`
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}주 전`
        const months = days / 30
        if (months < 12) return `${Math.floor(months)}개월 전`
        const years = days / 365
        
        return `${Math.floor(years)}년 전`
    }

    return (
        <>
            <ol className={style.cont_comment}>
                {
                    commentList.map((data) => {
                        const commentCreateDate = setCommentDate(new Date(data.createdAt));
                        return (
                            <li key={data.id}>
                                <ProfileCard profileImg={data.author.image} profileState="comment" profileName={data.author.username} profileCont={commentCreateDate}  handleBtn={() => {handleProfile(data.author.accountname)}}/>
                                <p className={style.p_now_comment}>{data.content}</p>            
                                <img src={moreIcon} className={style.btn_comment_plus} alt="더보기 버튼"/>
                            </li>
                        )
                    })
                }
            </ol>
        </>
    )
}
