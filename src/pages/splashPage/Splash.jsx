import React, { useLayoutEffect } from "react"
import { useDispatch } from "react-redux"
import { loginUpdate } from "../../store" 
import { useNavigate } from "react-router-dom"
import style from "./splash.module.css"
import splashImg from "../../assets/imgs/splash.png"

export default function Splash() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialLoginData = JSON.parse(localStorage.getItem("loginStorage"));
    
    const routeTo = (route) => {
        navigate(route)
    }


    useLayoutEffect(() => {
        if (!!initialLoginData) {
            dispatch(loginUpdate(initialLoginData))
            setTimeout(() => routeTo("/home"), 1000)
        } else {
            setTimeout(() => routeTo("/login"), 1000)
        }
    }, [])

    return (
        <div className={style.cont_splash}>
            <img src={splashImg}></img>
        </div>
    )
}
