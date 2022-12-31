import React ,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/imgs/chat_profile.jpg";
import profileImg2 from "../../assets/imgs/profile-none.png";
import profileImg3 from "../../assets/imgs/chat_profile3.jpg";

import Header from '../../components/common/header/Header';
import Modal from '../../components/common/modal/Modal';
import ModalPortal from '../../components/common/modal/ModalPortal';
import Navbar from '../../components/common/navbar/Navbar';
import style from './chatList.module.css'

export default function ChatList() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const chat = [{
        name: "전자제품 농장",
        img: profileImg,
        txt: "내가 만든 쿠키~ 너를 위해 구웠지",
        date: "2022.12.31"    
    },
    {
        name: "JavaScript 마스터",
        img: profileImg2,
        txt: "내 장점이 뭔지 알아 바로 솔직한거야",
        date: "2022.10.02"    
    },
    {
        name: "전자상가",
        img: profileImg3,
        txt: "치킨 먹고싶당 떡볶이 먹고싶다",
        date: "2022.8.13"    
    }
]
    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    const handleModal = (event) => {
        // Input을 체크해서 state를 변경하는 함수.
        if (event.target.name === "수정") console.log(event.target.name); 
        else if (event.target.name === "삭제") console.log(event.target.name);
        else console.log(event.target.name);
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
                    <li className={style.wrap_chat} onClick = {moveChatingRoom} id={idx} >
                        <div  className={style.cont_img} >
                            <img className={style.profile_img} src={x.img} alt="프로필 이미지" />
                        </div>
                        <div className={idx!==2 && `${style.icon}`}></div>
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
                        handleModal={handleModal} />    
                    }    
                        
                </ModalPortal>    
            </div>
        <Navbar type="chat"/>
        </div>
    )
}
