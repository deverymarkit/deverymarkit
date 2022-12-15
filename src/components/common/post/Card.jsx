import React from 'react'
import BasicProfileImg from '../BasicProfileImg'
import style from './Card.module.css'
import moreIcon from "../../../assets/imgs/more-vertical.png"

export default function Post() {
    
    return (
        <section className={style.wrap}>
        <BasicProfileImg type = "postlist"/>
        <div className={style.cont_post}>
            <p className={style.p_nickname}>애월읍 위니브 감귤농장</p>
            <span >@ weniv_Mandarin</span>
            <img src={moreIcon} className={style.btn_plus} alt="더보기 버튼"/>
            <p className={style.p_content}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem repudiandae, dolor vero repellat iste deleniti perferendis fuga? Quos cumque repellendus, repellat et architecto minus dolores consequatur temporibus, commodi fugit accusantium.</p>
            {/* <img src="" alt="본문 이미지" /> */}
            <div className={style.box_img}>
                본문이미지 대체용
            </div>
            <div className={style.cont_btn}>
                <img src="" alt="하트" />
                <span className={style.span_count}>58</span>
                <img src="" alt="댓글" />
                <span className={style.span_count}>12</span>
            </div>
            <span>2022년 12월 13일</span>
        </div>
    </section>
    )
}
