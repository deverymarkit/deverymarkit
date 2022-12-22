import React from "react";

import style from "./profileBtn.module.css";

export default function MyProfileBtn() {
    return (
        <>
            <button type="button" className={style.btn_user_update}>프로필 수정</button>
            <button type="button" className={style.btn_product_add}>상품 등록</button>   
        </>
    )
}