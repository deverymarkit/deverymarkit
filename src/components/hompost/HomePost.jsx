import React from 'react'
import BagicProfileImg from '../common/BagicProfileImg'

export default function HomePost() {
    return (
        <>
            <BagicProfileImg/>
            <h2>닉네임</h2>
            <span>@닉네임</span>
            <button>더보기 버튼</button>
            <p>본문</p>
            <img src="" alt="본문 이미지" />
            <span>하트</span>
            <span>댓글</span>
            <time>2022년 12월 13일</time>
        </>
    )
}
