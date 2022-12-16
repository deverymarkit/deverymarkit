import React, { useEffect, useState, useRef } from "react"
import style from "./signup.module.css"
import axios from 'axios';

export default function Signup() {
    const [isInputEmail, setIsInputEmail] = useState("");
    const [isInputPassword, setIsInputPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [btnColor, setButtonColor] = useState("white");
    const [btnTxtColor, setBtnTxtColor] = useState("gray");

    const emailRef = useRef("");
    const passwordRef = useRef("");

    // axios
    const 액시오스 = async (emailValue) => {
        const url = 'https://mandarin.api.weniv.co.kr'
        try {
            const 대답 = axios.post(`${url}/user/emailvalid`, {
                "user": {
                    "email": emailValue,
                },
                "headers": {
                    "Content-Type": "application/json"
                }
            })
            console.log((await 대답).data.message)
        } catch(err) {
            console.log("에러입니다. 휴먼.")
        }
    }

    // 유효성 검사를 진행합니다.
    useEffect(() => {
        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (emailRegex.test(isInputEmail) === true && isInputPassword.length > 5) {
            setBtnTxtColor("white")
            setButtonColor("#0F0B19");
            setIsDisabled(false);
        } else {
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
                name="email"
                ref={emailRef}
                className={style.input_signup}
                onChange={checkInput} 
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
                name="password"
                ref={passwordRef}
                className={style.input_signup}  
                onChange={checkInput}
                placeholder="비밀번호를 입력하세요.">
                </input>

                <button 
                className={style.btn_signup}
                disabled={isDisabled}
                style={{backgroundColor: btnColor, color: btnTxtColor}}
                onClick={(e) => {
                    e.preventDefault();
                    액시오스(emailRef.current.value)
                    console.log(emailRef.current.value)
                    console.log(passwordRef.current.value)
                }}>
                다음
                </button>

            </form>
        </section>
    )
}