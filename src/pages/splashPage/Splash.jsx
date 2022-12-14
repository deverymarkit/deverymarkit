import React from "react"
import style from "./splash.module.css"
import splashImg from "../../assets/imgs/splash.png"

export default function Splash() {
    return (
        <div className={style.cont_splash}>
            <img src={splashImg}></img>
        </div>
    )
}
