import { useNavigate } from "react-router-dom"
import React from "react"
import style from "./login.module.css"
import deveryLogo from "../../assets/imgs/mark-white.png"
import googleLogo from "../../assets/imgs/google_logo.png"
import kakaoLogo from "../../assets/imgs/kakao_logo.png"

export default function Login() {
    const navigate = useNavigate()

    return (
        <>
        <main className={style.main_login}>
            <h1 className={style.logo_login}>
                <img className={style.img_login} src={deveryLogo} alt="데브리마켓"/>
            </h1>
        </main>
        <section className={style.cont_login}>
            <div><button className={style.btn_snslogin}><img src={kakaoLogo} alt="카카오톡 계정으로 로그인" className={style.img_snslogin}/>카카오톡 계정으로 로그인</button></div>
            <div><button className={style.btn_snslogin}><img src={googleLogo} alt="구글 계정으로 로그인" className={style.img_snslogin}/>구글 계정으로 로그인</button></div>
            <div className={style.cont_loginsignup}>
                <div><button className={style.btn_login} onClick={() => {navigate("/loginemail")}}>이메일로 로그인</button></div>
                <div><button className={style.btn_join} onClick={() => {navigate("/signup")}}>회원가입</button></div>
            </div>
        </section>
        </>
    )
}
