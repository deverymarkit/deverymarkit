import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import style from "./signup.module.css";
import axios from "axios";

export default function Signup() {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");
    const [btnValid, setBtnValid] = useState("btn_invalid")
    const navigate = useNavigate();

    // 다음 버튼을 누를 시 서버에 데이터를 전송해서 유효성 인증 검사를 진행함.
    const emailValidation = async (emailValue, passwordValue) => {
        if (inputPassword.length < 6) {
            setPwdMsg("*비밀번호는 6자 이상이어야 합니다.")
            return
        }

        const move = (email, password) => {
            navigate('/profilesetting', {
                state: {
                    email: email,
                    password: password,
                }
            })
        }

        const url = 'https://mandarin.api.weniv.co.kr'
        try {
            const resEmailValid = axios.post(`${url}/user/emailvalid`, {
                "user": {
                    "email": emailValue,
                },
                "headers": {
                    "Content-Type": "application/json"
                }
            })
            const message = (await resEmailValid).data;
            move(emailValue, passwordValue)

        } catch(err) {
            const error = err;
            console.log(error.response.data.message);
        }
    }

    // 유효성 검사를 진행합니다.
    useEffect(() => {
        // 비밀번호 길이가 6개 이상일 경우, 6글자 이상 메세지를 삭제함.
        if (inputPassword.length >= 6) setPwdMsg("");
        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        if (emailRegex.test(inputEmail) && inputPassword.length >= 6) setBtnValid("btn_valid");
        else setBtnValid("btn_invalid");

    }, [inputEmail, inputPassword])

    // input 엘리먼트에 이벤트가 일어나는 것을 감지함.
    const checkInput = (event) => {
        if (event.target.name === "email") setInputEmail(event.target.value); 
        else if (event.target.name === "password") setInputPassword(event.target.value);
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
                className={style.input_signup}  
                onChange={checkInput}
                placeholder="비밀번호를 입력하세요.">
                </input>
            </form>
            <p className={style.p_warning}>{pwdMsg}</p>

            <button 
                className={style[btnValid]}
                onClick={(e) => {
                    e.preventDefault();
                    emailValidation(inputEmail, inputPassword)
                }}>
                다음
            </button>
        </section>
    )
}