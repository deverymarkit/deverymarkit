import React from "react";

import ProfileCard from "../common/card/ProfileCard";
import style from "./comment.module.css";
import moreIcon from "../../assets/imgs/icon-more-vertical.png";

export default function CommentList({ commentList }) {

    return (
        <>
            <ol className={style.cont_comment}>
                {
                    commentList.map((data) => 
                        <li>
                            <ProfileCard profileImg={data.author.image} profileState="comment" profileName={data.author.username} profileCont={data.createdAt}/>
                            <p className={style.p_comment_content}>{data.content}</p>            
                            <img src={moreIcon} className={style.btn_plus} alt="더보기 버튼"/>
                        </li>
                    )
                }
            </ol>
        </>
    )
}
