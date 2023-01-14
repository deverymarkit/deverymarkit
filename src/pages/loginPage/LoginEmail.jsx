import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import style from "./loginEmail.module.css"
import { useDispatch } from "react-redux";
import { loginUpdate } from "../../store";
import { customAxios } from "../../api/customAxios.js"

export default function Login() {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [loginWarning, setLoginWarning] = useState("")
    const [isDisabled, setIsDisabled] = useState(true);
    const [btnValid, isBtnValid] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // 유효성 검사를 진행합니다.
    useEffect(() => {
        if (inputEmail !== "" && inputPassword.length > 5) {
            isBtnValid(true);
            setIsDisabled(false);
        } else {
           isBtnValid(false)
           setIsDisabled(true);
        };
        setLoginWarning("")
    }, [inputEmail, inputPassword])


    // input 엘리먼트에 이벤트가 일어나는 것을 감지합니다.
    const checkInput = (event) => {
        if (event.target.name === "email") setInputEmail(event.target.value); 
        else if (event.target.name === "password") setInputPassword(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        getLogin(inputEmail, inputPassword)
    }

    const setStorage = (data) => {
        localStorage.removeItem("loginStorage")
        localStorage.setItem("loginStorage", JSON.stringify({
            accountname: data.accountname,
            image: data.image,
            intro: data.intro,
            token: data.token,
            username: data.username
        }));
    }

    const getLogin = async(email, password) => {
        const userdata = {
            "email": email,
            "password": password
        }
        try {
            const loginRes = await customAxios.post("user/login", {
                "user": {
                    ...userdata
                }
            })
            const loginData = loginRes.data.user
            if (loginRes.data.status === 422) {
                setLoginWarning(loginRes.data.message)
                return
            }
            if (loginData) {
                dispatch(loginUpdate(loginData));
                setStorage(loginData)
                navigate('/home')
            }
        } catch(err) {
            console.error(err);
        }
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

                <p className={style.p_warning}>{loginWarning}</p>

                <button 
                className={`${style.btn_login} ${btnValid ? style.valid : style.invalid}`}
                disabled={isDisabled}
                onClick={handleLogin}>
                로그인
                </button>

            </form>

            <button
            type="button" 
            className={style.btn_join}
            onClick={() => navigate("/signup")}>
            이메일로 회원가입
            </button>
        </section>
    )
}
