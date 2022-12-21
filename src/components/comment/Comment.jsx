import React from "react";
import BasicProfileImg from "../common/BasicProfileImg";
import style from "./comment.module.css";
import moreIcon from "../../assets/imgs/more-vertical.png";

export default function CommentList() {
    return (
        <>
            {/* commentList */}
            <div className={style.wrap_comment}>
                <BasicProfileImg />
                <div className={style.cont_comment}>
                    <div className={style.cont_tit}>
                        <p><strong className={style.p_comment_name}>댓글닉넴</strong></p>
                        <span className={style.span_time}>1분 전</span>
                    </div>
                    <p className={style.p_comment_content}>댓글 내용입니다.</p>
                </div>
                <img src={moreIcon} className={style.btn_plus} alt="더보기 버튼"/>
            </div>
            {/* commentInput */}
            <div className={style.wrap_commentInput}>
                <BasicProfileImg />
                <input className={style.inp_comment} type="text" placeholder="댓글 입력하기..."/>
                <button className={style.btn_commentInput}>개시</button>
            </div>
        </>
    );
}
