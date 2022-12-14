import React from "react";

import MyProfileBtn from "../button/MyProfileBtn";
import YourProfileBtn from "../button/YourProfileBtn";

export default function ProfileInfo() {

    const userType = "my";

    return (
        <section>
            <h2>프로필 정보 섹션(ir처리)</h2>
            <div>
                <p>
                    2950
                    <span>followers</span>
                </p>
                <img src="" alt="프로필 사진" />
                <p>
                    165
                    <span>followings</span>
                </p>
            </div>
            <span>굉장한 개발자</span>
            <span>@jinyjiny</span>
            <span>개발 편하게 하고싶어요</span>
            <div>
                { userType === 'your' ? <YourProfileBtn /> : <MyProfileBtn /> }
            </div>
        </section>
    )
}
