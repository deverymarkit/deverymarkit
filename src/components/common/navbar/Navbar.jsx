import React from "react"
import style from "./navbar.module.css"
import homeIcon from "../../../assets/imgs/icon-home.png"
import messageIcon from "../../../assets/imgs/icon-message-circle.png"
import editIcon from "../../../assets/imgs/icon-edit.png"
import userIcon from "../../../assets/imgs/icon-user.png"

export default function Navbar() {
    return (
        <section className={style.cont_icons}>
            <div className={style.div_icon}>
                <img 
                src={homeIcon} 
                className={style.img_icon}>
                </img>
                <span 
                className={style.txt_icon}>
                홈
                </span>
            </div>

            <div className={style.div_icon}>
                <img 
                src={messageIcon} 
                className={style.img_icon}>
                </img>
                <span className={style.txt_icon}>
                채팅
                </span>
            </div>

            <div className={style.div_icon}>
                <img 
                src={editIcon} 
                className={style.img_icon}>
                </img>
                <span className={style.txt_icon}>
                게시물 작성
                </span>
            </div>

            <div className={style.div_icon}>
                <img 
                src={userIcon} 
                className={style.img_icon}>
                </img>
                <span 
                className={style.txt_icon}>
                프로필
                </span>
            </div>
        </section>
    )
}