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
import Page404 from "../Page404";
import useCustomModal from "../../hooks/useCustomModal";
import useCustomTopBtn from "../../hooks/useCustomTopBtn";

export default function Profile() {
    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const loginAccountName = loginInfo.accountname;

    const { accountname } = useParams();
    const [showButton ,scrollToTop] = useCustomTopBtn();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [profileInfo, setProfileInfo] = useState("");
    const navigate = useNavigate();
    const {
        modalOpen,
        modalSecondOpen,
        setModalOpen,
        setModalSecondOpen,
        showModal,
    } = useCustomModal();

    let profileType = "";

    if (loginAccountName === accountname) {
        profileType = "my";
    } else {
        profileType = "your";
    }

    const routeTo = (route) => {
        navigate(route);
    };

    const getProfileInfo = async () => {
        try {
            const result = await customAuthAxios.get(`/profile/${accountname}`);
            setProfileInfo(result.data.profile);
            setIsLoading(false);
        } catch (err) {
            setErrorMsg(err.response.data.message);
            setIsLoading(false);
            console.error(err);
            setIsError(true);
        }
    };

    const handleProfileDetail = (event) => {
        if (event.target.name === "설정 및 개인정보") {
            navigate(`/profilemodify`);
            setModalOpen(false);
        } else if (event.target.name === "로그아웃") {
            setModalSecondOpen(true);
            setModalOpen(false);
        }
    };

    // 로그아웃 이벤트
    const handleProfileLogout = async () => {
        try {
            localStorage.removeItem("loginStorage");
            routeTo("/");
            setModalSecondOpen(false);
        } catch (err) {
            console.error(err);
        }
}

    useEffect(() => {
        getProfileInfo();
    }, [accountname]);

    if (isLoading) {
        return <Loading />;
    } else if (isError) {
        return <Page404 errorMsg={errorMsg} />;
    } else {
        return (
            <>
                <Header type="moreBtnPage" handleHeaderBtn={showModal} />
                <main className={style.main_profile}>
                    <UserInfo
                        profileInfo={profileInfo}
                        setProfileInfo={setProfileInfo}
                        profileType={profileType}
                    />
                    <Product
                        accountname={profileInfo.accountname}
                        profileType={profileType}
                    />
                    <Post profileInfo={profileInfo} profileType={profileType} />
                </main>
                {showButton && <aside className="scroll_cont">
                                    <button className="top_btn" onClick={scrollToTop}>top</button>
                                </aside>}
                <Navbar type={profileType === "my" && "profile"} />
                <ModalPortal>
                    {modalOpen && (
                        <Modal
                            type="profile"
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            handleHeaderBtn={showModal}
                            handleModal={handleProfileDetail}
                        />
                    )}
                    {modalSecondOpen && (
                        <MessageModal
                            type="profile"
                            modalOpen={modalSecondOpen}
                            setModalOpen={setModalSecondOpen}
                            handleHeaderBtn={showModal}
                            handleModal={handleProfileLogout}
                        />
                    )}
                </ModalPortal>
            </>
        );
    }
}
