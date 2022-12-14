import React from "react"
import style from "./signup.module.css"

export default function Signup() {
    return (
        <section className={style.cont_signup}>
            <h1 className={style.tit_signup}>
                이메일로 회원가입
                </h1>

            <form className={style.form_signup}>
                <label 
                htmlFor='emailInput' 
                className={style.label_signup}>
                이메일
                </label>

                <input 
                type="email" 
                id="emailInput"
                className={style.input_signup} 
                placeholder="이메일 주소를 적어주세요.">
                </input>

                <label 
                htmlFor="passwordInput" 
                className={style.label_signup}>
                비밀번호
                </label>

                <input 
                type="password" 
                id="passwordInput"
                className={style.input_signup}  
                placeholder="비밀번호를 입력하세요.">
                </input>

                <button 
                className={style.btn_signup}>
                다음
                </button>

            </form>
        </section>
    )
}
