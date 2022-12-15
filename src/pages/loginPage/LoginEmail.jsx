import React, { useEffect, useState } from 'react'
import style from "./loginEmail.module.css"

export default function Login() {
    const [isInputEmail, setIsInputEmail] = useState("")
    const [isInputPassword, setIsInputPassword] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    const [btnColor, setButtonColor] = useState("white")
    const [btnTxtColor, setBtnTxtColor] = useState("gray")

    // 유효성 검사를 진행합니다.
    useEffect(() => {
        if (isInputEmail !== "" && isInputPassword.length > 5) {
            console.log("펄스아니지롱");
            setBtnTxtColor("white")
            setButtonColor("#0F0B19");
            setIsDisabled(false);
        } else {
           console.log("펄스지롱");
           setBtnTxtColor("gray")
           setButtonColor("white");
           setIsDisabled(true);
        };
    }, [isInputEmail, isInputPassword])

    // input 엘리먼트에 이벤트가 일어나는 것을 감지합니다.
    const checkInput = (event) => {
        if (event.target.name === "email") setIsInputEmail(event.target.value); 
        else if (event.target.name === "password") setIsInputPassword(event.target.value);
    }

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
                name="email"
                className={style.input_login}
                onChange={checkInput} 
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
                name="password"
                className={style.input_login}
                onChange={checkInput} 
                placeholder="비밀번호를 입력하세요.">
                </input>

                <button 
                className={style.btn_login}
                disabled={isDisabled}
                style={{backgroundColor: btnColor, color: btnTxtColor}}>
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
