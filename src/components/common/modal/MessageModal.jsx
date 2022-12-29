import React, {useEffect, useRef} from 'react'
import style from "./messageModal.module.css";

export default function MessageModal({type, modalOpen, setModalOpen, handleModal}) {

    const pages = {
        "profile":{
            txt : "로그아웃하시겠어요?",
            btn : ["취소", "로그아웃"]
            },
        "post":{
            txt : "게시글을 삭제할까요?",
            btn : ["취소", "삭제"]
            },
        "product":{
            txt : "상품을 삭제할까요?",
            btn : ["취소", "삭제"]
            }
    }

    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };
    
    // 모달 외부 클릭시 끄기 처리
    // Modal 창을 useRef로 취득
    const modalRef = useRef();
    
    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalOpen(false);
            }
        };
        
        // 이벤트 핸들러 등록
        document.addEventListener('mousedown', handler);
        // document.addEventListener('touchstart', handler); // 모바일 대응
        
        return () => {
            // 이벤트 핸들러 해제
            document.removeEventListener('mousedown', handler);
            // document.removeEventListener('touchstart', handler); // 모바일 대응
        };
    });

    return (
        <div className={style.wrap_messageModal} ref={modalRef} >
            <p className={style.p_messageModal} >{pages[type].txt}</p>
            <div  className={style.cont_messageModal}>
                <button className={`${style.btn_messageModal} ${style.first_btn_messageModal}`} onClick= {closeModal}>{pages[type].btn[0]}</button>
                <button className={style.btn_messageModal} onClick= {handleModal}>{pages[type].btn[1]}</button>
            </div>
        </div>
    )
}
