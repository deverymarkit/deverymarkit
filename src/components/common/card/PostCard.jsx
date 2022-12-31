import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./slick/slick.css"
import "./slick/slick-theme.css"


import { customAuthAxios } from "../../../api/customAxios";
import ProfileCard from "./ProfileCard";
import style from "./postCard.module.css";

import moreIcon from "../../../assets/imgs/icon-more-vertical.png";
//import messageIcon from  "../../../assets/imgs/icon-message-small.svg";
import messageIcon from  "../../../assets/imgs/icon-message.svg";
import heartIcon from  "../../../assets/imgs/icon-heart.svg";
import heartFillIcon from  "../../../assets/imgs/icon-fill-heart.svg";
//import heartFillIcon from  "../../../assets/imgs/icon-heart-fill.svg";
import noImg from "../../../assets/imgs/no-picture.png";
import ModalPortal from "../modal/ModalPortal";
import Modal from "../modal/Modal";
import MessageModal from "../modal/MessageModal";

export default function PostCard({ post }) {

    const [isLike, setIsLike] = useState(post.hearted);
    const [likeCount, setLikeCount] = useState(post.heartCount);
    //토큰 가져오기
    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const userId = loginInfo._id;        
    // 모달 관리 변수
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSecondOpen, setModalSecondOpen] = useState(false);
    const userType = (post.author._id === userId)? "post" : "your";
    const navigate = useNavigate();
    const handlePostDetail = () => {
        navigate(`/post/${post.id}`, {
            state: {
                id : post.id,
                post: post
            }
        });
    }
    const handleProfile = () => {
        navigate(`/profile/${post.author.accountname}`);
    }

    const handleLikeToggle = () => {
        if (isLike === false) {
            const setLike = async() => {
                try {
                    customAuthAxios.post(`/post/${post.id}/heart`);
                    setLikeCount(likeCount + 1);
                    setIsLike((prev) => !prev);
                } catch (err) {
                    setIsLike(false);
                    setLikeCount(likeCount);
                    console.error(err);
                }
            }
            setLike();
        } else if (isLike === true) {
            const setUnLike = async () => {
                try {
                    customAuthAxios.delete(`/post/${post.id}/unheart`);
                    setLikeCount(likeCount - 1);
                    setIsLike((prev) => !prev);
                } catch (err) {
                    setIsLike(true);
                    setLikeCount(likeCount);
                    console.error(err);
                }
            }
            setUnLike();
        }
    }

    const handleImgError = (e) => {
        e.target.src = noImg;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    }

     // 모달창 노출
    const showModal = (e) => {
        console.log(post.id);
        setModalOpen(true);
    };
    const handleProductDetail = (event) => {
        // Input을 체크해서 state를 변경하는 함수.
        if (event.target.name === "수정") {
            navigate(`/postmodify/${post.id}`);
        }
        else if (event.target.name === "삭제") {
            setModalSecondOpen(true);
            setModalOpen(false);
            }
        else if (event.target.name === "신고하기"){setModalOpen(false)} 
    }
    // 포스트 삭제 이벤트
    const handlePostDelete = async () => {
            try {
                const postDeleteRes = await customAuthAxios.delete(`/post/${post.id}`);
                setModalSecondOpen(false);
            } catch (err) {
                console.error(err);
            }
    }
    return (
        <article className={style.article_post_card}>
            <div className={style.cont_post_author}>
                <ProfileCard profileImg={post.author.image} profileState="post" profileName={post.author.username} profileCont={post.author.accountname} handleBtn={handleProfile}/>
            </div>
            {
                post.image ? (
                    <Slider {...settings}>
                    {
                        post.image.split(",").map((imgsrc, index) => 
                            <img key={index} src={imgsrc} alt="" onClick={handlePostDetail} onError={handleImgError}/>
                        )
                        
                    }
                    </Slider>
                ) : null
            }
            <div className={style.cont_post_content}>
                <p className={style.post_contents}  onClick={handlePostDetail}>{post.content}</p>
                <div className={style.box_btn}>
                    <img src={isLike ? heartFillIcon : heartIcon} alt="좋아요" className={style.btn_like} onClick={handleLikeToggle}/>
                    <span className={style.span_count} >{likeCount}</span>
                    <img src={messageIcon} alt="댓글" onClick={handlePostDetail}/>
                    <span className={style.span_count} onClick={handlePostDetail}>{post.comments.length}</span>
                </div>
                <span className={style.span_post_date}>
                    {
                        new Intl.DateTimeFormat("ko", { dateStyle: "long" }).format(new Date(post.createdAt))
                    }
                </span>
            </div>
            <img src={moreIcon} className={style.btn_more} alt="더보기" onClick={showModal}/>
            <ModalPortal>
                {modalOpen && 
                    <Modal  type={userType} 
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen} 
                            handleHeaderBtn={showModal}
                            handleModal={handleProductDetail} />}    
                {modalSecondOpen &&
                    <MessageModal  
                            type="post" 
                            modalOpen={modalSecondOpen}
                            setModalOpen={setModalSecondOpen} 
                            handleHeaderBtn={showModal}
                            handleModal={handlePostDelete} />} 
            </ModalPortal>    
        </article>
    )
}
