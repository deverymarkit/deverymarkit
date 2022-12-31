import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { customAuthAxios } from "../../api/customAxios";
import Header from "../../components/common/header/Header";
import ModalPortal from "../../components/common/modal/ModalPortal";
import Modal from "../../components/common/modal/Modal";
import MessageModal from "../../components/common/modal/MessageModal";
import Navbar from "../../components/common/navbar/Navbar";
import UserInfo from "../../components/profile/ProfileInfo";
import Product from "../../components/product/Product";
import Post from "../../components/post/Post";
import Loading from "../Loading";
import style from "./profile.module.css";

export default function Profile() {

    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const loginAccountName = loginInfo.accountname;

    const { accountname } = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState("");
    const navigate = useNavigate();
    // 모달 관리 변수
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSecondOpen, setModalSecondOpen] = useState(false);

    let profileType = "";

    if (loginAccountName === accountname) {
        profileType = "my";
    } else {
        profileType = "your";
    }

    const routeTo = (route) => {
        navigate(route)
    }
    // 모달창 노출
    const showModal = (e) => {
        setModalOpen(true);
        console.log(e.currentTarget.dataset.link)
    };

    const getProfileInfo = async () => {
        try {
            const result = await customAuthAxios.get(`/profile/${accountname}`);
            setProfileInfo(result.data.profile);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    }
    
    const handleProfileDetail = (event) => {
        if (event.target.name === "설정 및 개인정보") setModalOpen(false);
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

    useEffect(() => {
        getProfileInfo();
    }, [accountname])

    /**
     * 1. undefined방지를 위한 loading, error state관리 필요
     * 2. localstorage정보가 없으면 접근할 수 없는 페이지 입니다. 필요
     */

    if(isLoading) {
        return <Loading />
    } else {
        return (
            <>
                <Header type="profile" handleHeaderBtn={showModal}/>
                <main className={style.main_profile}>
                    <UserInfo profileInfo={profileInfo} setProfileInfo={setProfileInfo} profileType={profileType}/>
                    <Product accountname={profileInfo.accountname} profileType={profileType}/>
                    <Post profileInfo={profileInfo} profileType={profileType}/>
                </main>
                <Navbar type={profileType === "my" && "profile"} />
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
            </>
        )
    }
}