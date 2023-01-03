import React, { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { loginUpdate } from "../../store" 
import { useNavigate } from "react-router-dom"
import style from "./splash.module.css"
import splashImg from "../../assets/imgs/mark-white.png"

export default function Splash() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialLoginData = JSON.parse(localStorage.getItem("loginStorage"));

    const completionWord = '데브리마킷';
    const [blogTitle, setBlogTitle] = useState('')
    const [count, setCount] = useState(0)


    useEffect(() => {
        const typingInterval = setInterval(() => {
            setBlogTitle((prevTitleValue) => {
                let result = prevTitleValue ? prevTitleValue + completionWord[count] : completionWord[0]
                setCount(count + 1)
                if (count >= completionWord.length) {
                    setCount(count)
                    setBlogTitle(completionWord)
                }
                return result
            })
        }, 100);
        return () => {
            clearInterval(typingInterval)
        }
    })

    useLayoutEffect(() => {
        if (!!initialLoginData) {
            dispatch(loginUpdate(initialLoginData))
            setTimeout(() => navigate("/home"), 1000)
        } else {
            setTimeout(() => navigate("/login"), 1000)
        }
    }, [])

    return (
        <div className={style.cont_splash}>
            <img src={splashImg} className={style.img_splash}></img>
            <h1 className={`${style.tit_splash} ${style.effect_typing}`}>{blogTitle}</h1>
        </div>
    )
}
