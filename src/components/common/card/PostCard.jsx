import React from "react";

import ProfileCard from "./ProfileCard";
import style from "./postCard.module.css";
import moreIcon from "../../../assets/imgs/icon-more-vertical.png";
import basicProfileImg from "../../../assets/imgs/profile-none.png";


export default function PostCard() {
    
    let profileImg = basicProfileImg;
    let profileState = "post";
    let profileName = "개발 편하게 하고 싶다.";
    let profileCont = "@ jinyjiny";

    return (
        <article className={style.article_post_card}>
            <h3 className="ir">포스트 카드</h3>
            <ProfileCard profileImg={profileImg} profileState={profileState} profileName={profileName} profileCont={profileCont}/>
            <div className={style.cont_post_card}>
                <p className={style.post_contents}>옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.
                </p>
                {/* 데이터에서 이미지가 있으면 나타내야함. */}
                <div className={style.box_post}>
                    이미지 슬라이드
                </div>
                <div className={style.box_btn}>
                    <img src="" alt="좋아요" />
                    <span className={style.span_count}>58</span>
                    <img src="" alt="댓글" />
                    <span className={style.span_count}>12</span>
                </div>
                <span className={style.span_post_date}>2022년 12월 13일</span>
                <img src={moreIcon} className={style.btn_more} alt="더보기" />
            </div>
        </article>
    )
}
