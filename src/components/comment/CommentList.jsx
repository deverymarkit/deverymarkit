import React, {useState, useEffect} from "react";

import ProfileCard from "../common/card/ProfileCard";
import style from "./comment.module.css";
import moreIcon from "../../assets/imgs/icon-more-vertical.png";
import { useNavigate, useParams } from "react-router-dom";
import ModalPortal from "../common/modal/ModalPortal";
import Modal from "../common/modal/Modal";
import { customAuthAxios } from "../../api/customAxios";

export default function CommentList({ commentList, handleUpdateComment }) {

    const navigate = useNavigate();
    // 모달 관리 변수
    const [modalOpen, setModalOpen] = useState(false);
    const [commentId , setCommentId] = useState("");
    const {postid} = useParams();
    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const userId = loginInfo._id;  
    const [userType, setUserType] = useState("");

    useEffect(()=>{
        //스크롤 금지 
        if(modalOpen){
            document.body.style.overflow ="hidden"
        }else{
            document.body.style.overflow =""
        }
    }, [modalOpen])
    
    // 모달창 노출
    const showModal = (e) => {
        const userType = (e.target.dataset.author === userId)? "myComment" : "your";
        setUserType(userType);
        setCommentId(e.target.dataset.id);

        setModalOpen(true);
    };
    
    const handleCommentModal =  (event) => {
        // Input을 체크해서 state를 변경하는 함수.
        if (event.target.name === "삭제하기") {
            handleCommentDelete();
            
        }
        else if (event.target.name === "신고하기"){
            handleCommentReport();
        }
    }

    // 댓글 삭제 이벤트
    const handleCommentDelete = async () => {
        try {
            console.log(postid);
            console.log(commentId);
            const commentDeleteRes = await customAuthAxios.delete(`/post/${postid}/comments/${commentId}`);
            await handleUpdateComment();
            setModalOpen(false)

            } catch (err) {
                console.error(err);
            }
    }

    // 댓글 신고 이벤트
    const handleCommentReport = async () => {
        try {
            const commentReportRes = await customAuthAxios.delete(`/post/${postid}/comments/${commentId}/report`);
            setModalOpen(false)

            } catch (err) {
                console.error(err);
            }
    }

    const handleProfile = (param) => {
        navigate(`/profile/${param}`);
    }

    const setCommentDate = (createdAt) => {
        const elapsedTime = new Date() - createdAt;

        const seconds = elapsedTime / 1000
        if (seconds < 60) return `방금 전`
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}분 전`
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}시간 전`
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}일 전`
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}주 전`
        const months = days / 30
        if (months < 12) return `${Math.floor(months)}개월 전`
        const years = days / 365
        
        return `${Math.floor(years)}년 전`
    }

    return (
        <>
            <ol className={style.cont_comment}>
                {
                    commentList.map((data) => {
                        const commentCreateDate = setCommentDate(new Date(data.createdAt));
                        return (
                            <li key={data.id}>
                                <ProfileCard profileImg={data.author.image} profileState="comment" profileName={data.author.username} profileCont={commentCreateDate}  handleBtn={() => {handleProfile(data.author.accountname)}}/>
                                <p className={style.p_now_comment}>{data.content}</p>            
                                <img src={moreIcon} data-id={data.id} data-author={data.author._id}  className={style.btn_comment_plus} alt="더보기 버튼" onClick={showModal}/>
                                
                            </li>
                        )
                    })
                }
            </ol>
            <ModalPortal>
                {modalOpen && 
                    <Modal  type={userType} 
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen} 
                            handleModal ={handleCommentModal} />}    
            </ModalPortal>    
        </>
    )
}
