import React from "react";
import style from "./header.module.css";
import { useNavigate } from 'react-router-dom';
import backIcon from "../../../assets/imgs/icon-arrow-left.png";
import moreIcon from "../../../assets/imgs/icon-more-vertical.png";
import searchIcon from "../../../assets/imgs/icon-search.png";

export default function Header({ type, IsValue, handleHeaderBtn}) {
    const navigate = useNavigate();
    const pages = {
        "upload":{
            btn : "업로드"
            },
        "modification":{
            btn : "저장"
            }
    }

    const handleBackBtn = () => {
        navigate(-1);
    }

    return (
        <section className={`${style.cont_header} ${type === "follower" && style.folloewers} ${type === "following" && style.folloewers}`} >
            {type !== "home" && <img className={style.btn_back} src={backIcon} alt="뒤로 가기" onClick={handleBackBtn}/>}
            {(type === "upload" || type === "modification") && <button className={`${style.btn_save} ${ IsValue && style.active_btn}`} onClick={handleHeaderBtn} >{pages[type].btn}</button>}
            {(type === "profile" || type === "post") && <img src={moreIcon} alt="더보기버튼" onClick={handleHeaderBtn} />}
            {type === "home" && (
                <>
                    <p>데브리마킷</p>
                    <img src={searchIcon} alt="검색버튼" onClick={() => {navigate('/search')}} />
                </>
            )
            }
            {type === "follower" && <p>follower</p>}
            {type === "following" && <p>following</p>}
            {type === "search" && <input className={style.input_header} type="text" placeholder="계정 검색" onChange={handleHeaderBtn}/>}
        </section>
    )
}


