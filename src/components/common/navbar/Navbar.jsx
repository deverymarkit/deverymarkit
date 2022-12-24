import React from "react"
import style from "./navbar.module.css"
import homeIcon from "../../../assets/imgs/icon-home.png"
import activeHomeIcon from "../../../assets/imgs/icon-home-fill.png"
import activeProfileIcon from "../../../assets/imgs/icon-user-fill.png"
import messageIcon from "../../../assets/imgs/icon-message-circle.png"
import editIcon from "../../../assets/imgs/icon-edit.png"
import userIcon from "../../../assets/imgs/icon-user.png"
import { useNavigate } from "react-router-dom"

export default function Navbar({ type }) {

    // 로직 어떻게 할 건가?
    // 1. type을 넘겨준다 (home, chat, upload, profile)
    // 2. type마다 아이콘의 색깔을 다르게한다. (선택된 색깔로 교체)
    // 

    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const loginAccount = loginInfo.accountname;

    const navigate = useNavigate();
    const handleMyProfile = () => {
        navigate(`/profile/${loginAccount}`);
    }
    const handleHome = () => {
        navigate("/home")
    }


    return (
        <section className={style.cont_icons}>
            <div className={style.div_icon} onClick={handleHome}>
                <img 
                src={type === "home" || type === "search" ? activeHomeIcon : homeIcon } 
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

            <div className={style.div_icon} onClick={handleMyProfile}>
                <img 
                src={ type === "profile" ? activeProfileIcon : userIcon} 
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
