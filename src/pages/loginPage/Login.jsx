import React from 'react'
import style from "./login.module.css"

export default function Login() {
    return (
        <section className={style.cont_login}>
            <h1 className={style.tit_login}>
                로그인
            </h1>

            <form className={style.form_login}>
                <label 
                htmlFor='emailInput' 
                className={style.label_login}>
                이메일
                </label>

                <input 
                type="email" 
                id="emailInput"
                className={style.input_login} 
                placeholder="이메일 주소를 적어주세요.">
                </input>

                <label 
                htmlFor="passwordInput" 
                className={style.label_login}>
                비밀번호
                </label>

                <input 
                type="password" 
                id="passwordInput"
                className={style.input_login}  
                placeholder="비밀번호를 입력하세요.">
                </input>

                <button 
                className={style.btn_login}>
                로그인
                </button>

            </form>

            <button 
            className={style.btn_join}>
            이메일로 회원가입
            </button>
        </section>
    )
}
