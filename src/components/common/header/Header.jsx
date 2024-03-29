import React from "react";
import style from "./header.module.css";
import { useNavigate } from 'react-router-dom';
import backIcon from "../../../assets/imgs/icon-arrow-left.png";
import moreIcon from "../../../assets/imgs/icon-more-vertical.png";
import searchIcon from "../../../assets/imgs/icon-search.png";

export default function Header({ type, IsValue, handleHeaderBtn}) {
    const navigate = useNavigate();

    const handleBackBtn = () => {
        navigate(-1);
    }

    return (
        <section className={`${style.cont_header} ${type === "follower" && style.folloewers} ${type === "following" && style.folloewers}`} >
        {     
            {
            home : (
                <>
                    <p>데브리마킷</p>
                    <img src={searchIcon} alt="검색버튼" onClick={() => {navigate('/search')}} />
                </>
            ),
            moreBtnPage : (
                <>
                    <img className={style.btn_back} src={backIcon} alt="뒤로 가기" onClick={handleBackBtn}/>
                    <img src={moreIcon} alt="더보기버튼" onClick={handleHeaderBtn} />
                </>
            ),
            upload : (
                <>
                    <img className={style.btn_back} src={backIcon} alt="뒤로 가기" onClick={handleBackBtn}/>
                    <button className={`${style.btn_save} ${ IsValue && style.active_btn}`} onClick={handleHeaderBtn} >업로드</button>
                </>
            ),
            modification : (
                <>
                    <img className={style.btn_back} src={backIcon} alt="뒤로 가기" onClick={handleBackBtn}/>
                    <button className={`${style.btn_save} ${ IsValue && style.active_btn}`} onClick={handleHeaderBtn} >저장</button>
                </>
            ),
            chat : (
                <>
                    <img className={style.btn_back} src={backIcon} alt="뒤로 가기" onClick={handleBackBtn}/>
                    <p className={style.p_chat}>{IsValue}</p>
                </>
            ), 
            search : (
                <>
                    <img className={style.btn_back} src={backIcon} alt="뒤로 가기" onClick={handleBackBtn}/>
                    <input className={style.input_header} type="text" placeholder="계정 검색" onChange={handleHeaderBtn}/>
                </>
            ),
            follower :(
                <>
                    <img className={style.btn_back} src={backIcon} alt="뒤로 가기" onClick={handleBackBtn}/>
                    <p>follower</p>
                </>
            ),
            following : (
                <>
                    <img className={style.btn_back} src={backIcon} alt="뒤로 가기" onClick={handleBackBtn}/>
                    <p>following</p>
                </>
            )

            }[type]
        } 
        </section>
    )
}


