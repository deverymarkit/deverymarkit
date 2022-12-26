import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./profileBtn.module.css";

export default function MyProfileBtn() {

    const navigate = useNavigate();
    const handleMoveProfileUpdatePage = () => {
        navigate(`profile/`);
    }

    const handleMoveAddProductPage = () => {
        navigate(``);
    }

    return (
        <>
            <button type="button" className={style.btn_user_update} onClick={handleMoveProfileUpdatePage}>프로필 수정</button>
            <button type="button" className={style.btn_product_add} onClick={handleMoveAddProductPage}>상품 등록</button>   
        </>
    )
}