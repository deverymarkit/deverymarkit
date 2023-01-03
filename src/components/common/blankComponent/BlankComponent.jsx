import React from "react";
import { useNavigate } from 'react-router-dom';
import style from "./blankComponent.module.css";
import bulbBlackImg from "../../../assets/imgs/bulb_black.png";
import page404WhiteImg from "../../../assets/imgs/page404-black.png";
import loading from "../../../assets/imgs/loading.png";

export default function BlankComponent({ type, errorMsg }) {
    
    const navigate = useNavigate();
    const pages = {
        "home":{
            src : bulbBlackImg,
            txt : "유저를 검색해 팔로우 해보세요!",
            btn : "검색하기",
            onClick : ()=>{
                navigate("/search")
            }
            },
        "page404":{
            src : page404WhiteImg,
            txt : errorMsg ? errorMsg : "페이지를 찾을 수 없습니다. :(",
            btn : "이전 페이지",
            onClick : ()=>{
                navigate(-1);
            }
            },
        "loading":{
            src : loading,
            txt : "로딩중입니다. :)"
        }
    }


    return (
        <section className={style.cont_blank}>
            <main className="homeContent_nonFeed">
                <img src={pages[type].src} className={style.img_blank} alt=""></img>
                <p className={style.p_blank}>{pages[type].txt}</p>
                {type !== "loading" ? <button type="button" className={style.btn_blank}  onClick={pages[type].onClick}>
                    {pages[type].btn}
                </button> : null }
            </main>
        </section>
    )
}



