import React from 'react'
import BagicProfileImg from '../../components/common/BagicProfileImg'

export default function Upload() {
    return (
        <div>
            {/* 상단바 뒤로가기/업로드 버튼 자리*/}
            <BagicProfileImg/>
            <input type="text" placeholder="게시글 입력하기..." required/>
            <img src="" alt="게시글 이미지" />
            <button type ="submit">사진추가</button>
        </div>
    )
}
