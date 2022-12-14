import React from "react";
import BagicProfileImg from "../common/BagicProfileImg";

export default function CommentList() {
    return (
        <div>
            <BagicProfileImg />
            <h2>댓글닉넴</h2>
            <span>1분 전</span>
            <button>더보기버튼</button>
            <p>댓글 내용입니다.</p>
        </div>
    );
}
