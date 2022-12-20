import React from 'react'
import { useNavigate } from 'react-router-dom';
import style from "./blankComponent.module.css"
import bulbBlackImg from "../../assets/imgs/bulb_black.png";
import page404WhiteImg from "../../assets/imgs/page404-black.png";

export default function BlankComponent({type}) {
    const navigate = useNavigate();
    const pages = {
        "home":{
            src : bulbBlackImg,
            txt : "유저를 검색해 팔로우 해보세요!",
            btn : "검색하기",
            onClick : ()=>{
                // 검색창보이기
            }
            },
        "page404":{
            src : page404WhiteImg,
            txt : "페이지를 찾을 수 없습니다. :(",
            btn : "이전 페이지",
            onClick : ()=>{
                navigate(-1);
            }
            }
    }


    return (
        <section className={style.cont_home}>
            <main className="homeContent_nonFeed">
                <img src={pages[type].src} className={style.img_bulbBlack} alt=""></img>
                <p className={style.txt_user}>{pages[type].txt}</p>
                <button type="button" className={style.searchBtn}  onClick={pages[type].onClick}>
                    {pages[type].btn}
                </button>
            </main>
        </section>
    )
}



