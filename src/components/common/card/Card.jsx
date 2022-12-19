import React from "react"

import BasicProfileImg from "../BasicProfileImg"
import style from "./card.module.css"
import moreIcon from "../../../assets/imgs/404_white.png"

export default function Card() {
    
    return (
        <article className={style.article_card}>
            {/*<h3 class="ir">포스트 카드</h3>*/}
            <div className={style.post_author}>
                <BasicProfileImg type="post"/>
                <p className={style.tit_user_name}>애월읍 위니브 감귤농장
                    <span className={style.tit_user_id}>@ weniv_Mandarin</span>
                </p>
            </div>
            <div className={style.post_info}>
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
