import React from 'react'
import BasicProfileImg from '../BasicProfileImg'
import styles from './postList.module.css'

export default function PostList() {
    return (
        <section className={styles.wrap}>
            <BasicProfileImg type = "postlist"/>
            <div className={styles.cont_post}>
                <p className={styles.p_nickname}>애월읍 위니브 감귤농장</p>
                <span >@ weniv_Mandarin</span>
                <button className={styles.btn_plus}>더보기 버튼</button>
                <p className={styles.p_content}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem repudiandae, dolor vero repellat iste deleniti perferendis fuga? Quos cumque repellendus, repellat et architecto minus dolores consequatur temporibus, commodi fugit accusantium.</p>
                {/* <img src="" alt="본문 이미지" /> */}
                <div className={styles.box_img}>
                    본문이미지 대체용
                </div>
                <div className={styles.cont_btn}>
                    <img src="" alt="하트" />
                    <span className={styles.span_count}>58</span>
                    <img src="" alt="댓글" />
                    <span className={styles.span_count}>12</span>
                </div>
                <span>2022년 12월 13일</span>
            </div>
        </section>
    )
}
