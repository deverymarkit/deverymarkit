import React from 'react'
import BagicProfileImg from '../../components/common/BagicProfileImg'

export default function Upload() {
    return (
        <div>
            {/* <UploadHeader/> */}
            <BagicProfileImg/>
            <input type="text" placeholder="게시글 입력하기..." required/>
            <img src="" alt="게시글 이미지" />
            <button type ="submit">사진추가</button>
        </div>
    )
}
