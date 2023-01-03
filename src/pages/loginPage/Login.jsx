import { useNavigate } from "react-router-dom"
import React from "react"
import style from "./login.module.css"
import deveryLogo from "../../assets/imgs/mark-white.png"

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
                <ul className={style.ul_login}>
                    <li><button className={style.btn_login} onClick={() => {navigate("/loginemail")}}>이메일로 로그인</button></li>
                    <li><button className={style.btn_join} onClick={() => {navigate("/signup")}}>회원가입</button></li>
                </ul>
        </section>
        </>
    )
}
