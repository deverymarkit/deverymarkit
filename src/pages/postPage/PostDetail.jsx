import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import { customAuthAxios } from "../../api/customAxios";
import Header from "../../components/common/header/Header";
import Comment from "../../components/comment/Comment";
import PostCard from "../../components/common/card/PostCard";
import ModalPortal from '../../components/common/modal/ModalPortal';
import Modal from '../../components/common/modal/Modal';
import MessageModal from "../../components/common/modal/MessageModal";
import Loading from "../Loading";
import style from "./postDetail.module.css";
import Page404 from "../Page404";

export default function PostDetail() {

    const location = useLocation();
    const navigate = useNavigate();
    //Id 가져오기
    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const accountname = loginInfo.accountname; 
    // const postId = location.state.id;
    const {postid} = useParams();
    // 모달 관리 변수
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSecondOpen, setModalSecondOpen] = useState(false);

    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const getPost = async () => {
        try {
            const postRes = await customAuthAxios.get(`/post/${postid}`);
            setPost(postRes.data.post);
            setIsLoading(false);
        } catch (err) {
            setErrorMsg(err.response.data.message)
            setIsLoading(false);
            console.error(err);
            setIsError(true);
        }
    }

    useEffect(() => {
        getPost();
    }, [])

    const routeTo = (route) => {
        navigate(route)
    }
    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };
    
    useEffect(()=>{
        //스크롤 금지 
        if(modalOpen || modalSecondOpen){
            document.body.style.overflow ="hidden"
        }else{
            document.body.style.overflow =""
        }
    }, [modalOpen, modalSecondOpen])

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

    if (isLoading) {
        return <Loading />
    }else if (isError){
        return <Page404 errorMsg={errorMsg}/>
    } 
    else {
        return (
            <>
                <Header type="post" handleHeaderBtn={showModal}/>
                <main className={style.wrap_post_detail}>
                    <section className={style.cont_post_detail}>
                        <h2 className="ir">게시글 상세보기</h2>
                        <PostCard post={post}/>
                    </section>
                    <section className={style.cont_post_comment}>
                        <h2 className="ir">댓글</h2>
                        <Comment post={post} getPost={getPost}/>
                    </section>
                </main>
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