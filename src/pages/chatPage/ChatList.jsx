import React ,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/imgs/chat_profile.jpg";
import profileImg2 from "../../assets/imgs/chat_profile3.jpg";
import profileImg3 from "../../assets/imgs/bulb_black.png";
import Header from '../../components/common/header/Header';
import ModalPortal from '../../components/common/modal/ModalPortal';
import Modal from '../../components/common/modal/Modal';
import MessageModal from "../../components/common/modal/MessageModal";
import Navbar from '../../components/common/navbar/Navbar';
import style from './chatList.module.css'
import useCustomModal from '../../hooks/useCustomModal';

export default function ChatList() {
    const navigate = useNavigate();
    //Id 가져오기
    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const accountname = loginInfo.accountname; 
    const {modalOpen, modalSecondOpen, setModalOpen, setModalSecondOpen,showModal} = useCustomModal();

    const chat = [{
        name: "전자제품 농장",
        img: profileImg,
        txt: "내가 만든 쿠키~ 너를 위해 구웠지",
        date: "2022.12.31"    
    },
    {
        name: "전자상가",
        img: profileImg2,
        txt: "치킨 먹고싶당 떡볶이 먹고싶다",
        date: "2022.8.13"    
    },
    {
        name: "JavaScript 마스터",
        img: profileImg3,
        txt: "내 장점이 뭔지 알아 바로 솔직한거야",
        date: "2022.10.02"    
    }
    ]
    const routeTo = (route) => {
        navigate(route)
    }

    

    const handleProfileDetail = (event) => {
        if (event.target.name === "설정 및 개인정보") {
            navigate(`/profilemodify`);
            setModalOpen(false);
        }
        else if (event.target.name === "로그아웃") {
            setModalSecondOpen(true);
            setModalOpen(false);
            }
    }

     // 로그아웃 이벤트
    const handleProfileLogout = async () => {
        try {
            localStorage.removeItem("loginStorage")
            routeTo("/");
            setModalSecondOpen(false);
        } catch (err) {
            console.error(err);
        }
}
    const moveChatingRoom = (event) =>{
        navigate(`/chatingroom/${event.currentTarget.id}`);
    }   

    return (
        <div className={style.wrap_top_chatList}>
            <Header type="post" handleHeaderBtn={showModal}/>
            <div className={style.wrap_chatList}>
                <div className={style.div_chat}></div>
                {chat.map(
                    (x,idx)=>
                    <li key={idx} className={style.wrap_chat} onClick = {moveChatingRoom} id={idx} >
                        <div  className={style.cont_img} >
                            <img className={style.profile_img} src={x.img} alt="프로필 이미지" />
                        </div>
                        <div className={idx!==2 ? `${style.icon}` : ``}></div>
                        <div className={style.cont_chat}>
                            <p className={style.name_chat}>{x.name}</p>
                            <div className={style.cont_span}>
                                <span className={style.text_chat}>{x.txt}</span>
                                <span className={style.text_chat}>{x.date}</span>
                            </div>
                        </div>
                    </li>
                    
                )}
                <ModalPortal>
                {modalOpen && 
                        <Modal  type="profile" 
                                modalOpen={modalOpen}
                                setModalOpen={setModalOpen} 
                                handleHeaderBtn={showModal}
                                handleModal={handleProfileDetail} />}    
                    {modalSecondOpen &&
                        <MessageModal  
                                type="profile" 
                                modalOpen={modalSecondOpen}
                                setModalOpen={setModalSecondOpen} 
                                handleHeaderBtn={showModal}
                                handleModal={handleProfileLogout} />} 
                </ModalPortal>     
            </div>
        <Navbar type="chat"/>
        </div>
    )
}
