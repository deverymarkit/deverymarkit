import React, { useState, useEffect } from 'react'

export default function useCustomModal(type) {
    // 모달 관리 변수
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSecondOpen, setModalSecondOpen] = useState(false);

    // 모달창 노출
    const showModal = (e) => {
        setModalOpen(true);
    };

    useEffect(()=>{
        //스크롤 금지 
        if(modalOpen){
            document.body.style.overflow ="hidden";
        }else{
            document.body.style.overflow ="";
        }
    }, [modalOpen])

    // 커스텀 훅에서
    //조건문으로 배열 return
    // if(type==="comment"){
    //     return [modalOpen, setModalOpen, showModal]

    // }else{
    //     return [modalOpen, modalSecondOpen, setModalOpen, setModalSecondOpen, showModal]
    // }
    
    // 객체로 return
    return {modalOpen, modalSecondOpen, setModalOpen, setModalSecondOpen, showModal}
}
