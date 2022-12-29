import React ,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import defalutImg from "../../assets/imgs/profile-none.png";
import Header from '../../components/common/header/Header';
import Modal from '../../components/common/modal/Modal';
import ModalPortal from '../../components/common/modal/ModalPortal';
import Navbar from '../../components/common/navbar/Navbar';
import style from './chatList.module.css'

export default function ChatList() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
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
        navigate("/chatingroom");
    }

    return (
        <div className={style.wrap_top_chatList}>
            <Header type="post" handleHeaderBtn={showModal}/>
            <div className={style.wrap_chatList}>
                <div className={style.div_chat}></div>
                {[1,2,3].map(
                    (x)=>
                    
                    <li className={style.wrap_chat} onClick = {moveChatingRoom} >
                        <img className={style.profile_img} src={defalutImg} alt="프로필 이미지" />
                        <div className={style.icon}></div>
                        <div className={style.cont_chat}>
                            <p className={style.name_chat}>애월읍 위니브 감귤농장</p>
                            <div className={style.cont_span}>
                                <span className={style.text_chat}>안녕하세요</span>
                                <span className={style.text_chat}>2022.10.24</span>
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
