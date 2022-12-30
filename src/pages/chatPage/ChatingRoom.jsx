import React, { useState } from "react";
import style from "./ChatingRoom.module.css";
import ProfileButton from "../../assets/imgs/profile-none.png";
import imgButton from "../../assets/imgs/img-button.png";
import imgArrow from "../../assets/imgs/icon-arrow-left.png";
import imgVertical from "../../assets/imgs/icon-more-vertical.png";
import Header from '../../components/common/header/Header';

export default function ChatingRoom() {
    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState([]);
    const date = new Date();

    let hour = date.getHours();
    let minute = date.getMinutes();
    
    if(hour > 12 ){
        hour = hour - 12 
        hour = `오후 ${hour}` 
    }else{
        hour = `오전 ${hour}` 
    }

    if(minute < 10){
        minute = `0${minute}`
    }
    const message = {
        chatMsg: msg,
        hour,
        minute
    }


    const inputChat = (e) => {
        setMsg(e.target.value);
    }


return (

        <>
            <Header type={"chat"}/>
            <section className={style.chat_wrap}>
                <div className={style.cont_box}>
                    <img className={style.profile_none} src={ProfileButton} />
                    <div className={style.cont_txt}>
                        <p className={style.chat_txt}>안녕하세요</p>
                    </div>
                    <span className={style.chat_time}>오전 12:20</span>
                </div>
                <div className={style.chat_down} >
                    {msgList.map((message, i) => (
                        <div
                            key={i}
                            className={`${style.cont_box} ${style.my_msg}`}
                        >

                            <span className={style.chat_time}>{`${message.hour}:${message.minute}`}</span>
                            <div className={style.cont_blacktxt}>
                                <p className={style.chat_txt}>{message.chatMsg}</p>
                            </div>
                        </div>
                    ))} 
                </div>
                <div className={style.input_div}>
                    <img className={style.img_button} src={imgButton} />
                    <input
                        type="text"
                        placeholder="메세지를 입력하세요"
                        className={style.inp_txt}
                        value={msg}
                        onChange={inputChat}
                        onKeyPress={(e) => {
                            if(msg){
                                if(e.code == 'Enter'){
                                    console.log(msg);
                                    setMsgList([...msgList, message]);
                                    setMsg("");
                                
                                }
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            if(msg){
                                console.log(msg);
                                setMsgList([...msgList, message]);
                                setMsg("");
                            }
                        }}
                        className={`${style.btn_submit} ${msg && style.btn_active}`}
                    >
                        전송
                    </button>
                </div>
            </section>
        </>
    );
}
