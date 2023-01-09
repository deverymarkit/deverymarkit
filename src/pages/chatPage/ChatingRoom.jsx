import React, { useState, useEffect } from "react";
import style from "./ChatingRoom.module.css";
import profileImg from "../../assets/imgs/chat_profile.jpg";
import profileImg2 from "../../assets/imgs/chat_profile3.jpg";
import profileImg3 from "../../assets/imgs/bulb_black.png";
import ProfileButton from "../../assets/imgs/profile-none.png";
import imgButton from "../../assets/imgs/img-button.png";
import ModalPortal from "../../components/common/modal/ModalPortal";
import Modal from "../../components/common/modal/Modal";
import Header from '../../components/common/header/Header';
import { useNavigate, useParams } from "react-router-dom";
import useCustomModal from "../../hooks/useCustomModal";

export default function ChatingRoom() {
    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState([]);
    const date = new Date();
    const {index} = useParams()
    let hour = date.getHours();
    let minute = date.getMinutes();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen, showModal] = useCustomModal();
    
    const chat = [{
        img: profileImg,
        name: "전자제품 농장",
        txt: "내가 만든 쿠키~ 너를 위해 구웠지",
        date: "오전 12:20"    
    },
    {
        img: profileImg2,
        name:"전자상가",
        txt: "치킨 먹고싶당 떡볶이 먹고싶다",
        date: "오전 9:02"    
    },
    {
        img: profileImg3,
        name:"JavaScript 마스터",
        txt: "내 장점이 뭔지 알아 바로 솔직한거야",
        date: "오후 1:37"    
    }]

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
    
    const handleCloseBtn = ()=>{
        navigate(-1)
    }

return (

        <>
            <Header type={"chat"} IsValue = {chat[index].name} handleHeaderBtn={showModal}/>
            <section className={style.chat_wrap}>
                <div className={style.cont_box}>
                    <img className={style.profile_img} src={chat[index].img} />
                    <div className={style.cont_txt}>
                        <p className={style.chat_txt}>{chat[index].txt}</p>
                    </div>
                    <span className={style.chat_time}>{chat[index].date}</span>
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
            </section>
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
                                    setMsgList([...msgList, message]);
                                    setMsg("");
                                
                                }
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            if(msg){
                                setMsgList([...msgList, message]);
                                setMsg("");
                            }
                        }}
                        className={`${style.btn_submit} ${msg && style.btn_active}`}
                    >
                        전송
                    </button>
                </div>
            <ModalPortal>
                {modalOpen && 
                    <Modal  type="chat" 
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen} 
                            handleModal={handleCloseBtn} />}    
            </ModalPortal>    
        </>
    );
}
