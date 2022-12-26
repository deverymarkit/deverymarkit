import React, { useEffect, useState } from "react";
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


export default function PostCard({ id, post }) {

    const [isLike, setIsLike] = useState(post.hearted);
    const [likeCount, setLikeCount] = useState(post.heartCount);
    const navigate = useNavigate();
    const handlePostDetail = () => {
        navigate(`/post/${post.id}`)
    }
    const handleProfile = () => {
        navigate(`/profile/${post.author.accountname}`)
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

    useEffect(() => {
        console.log(post.image)
    }, []);
    

    //const getPostDetail = async () => {
    //    try {
    //        const result = await customAuthAxios.get(`/post/${post.id}`);
    //        setHeartCount(result.data.heartCount);
    //    } catch (err) {
    //        console.error(err);
    //    }
    //}

    //useEffect(() => {
    //    getPostDetail();
    //}, [isLike])

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
        //autoplay: true,s
    }

 
    // post.image.split(",").map((imgsrc, index) => {console.log(imgsrc);})
    //let postImgDataList = [];
    //let a = post.image.includes(",")
    //if (a) {
    //    postImgDataList = post.image.split(",");
    //} 

    return (
        <article key={id} className={style.article_post_card}>
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
                    <span className={style.span_count}>{likeCount}</span>
                    <img src={messageIcon} alt="댓글" />
                    <span className={style.span_count}>{post.comments.length}</span>
                </div>
                <span className={style.span_post_date}>
                    {
                        new Intl.DateTimeFormat("ko", { dateStyle: "long" }).format(new Date(post.createdAt))
                    }
                </span>
            </div>
            <img src={moreIcon} className={style.btn_more} alt="더보기" />
        </article>
    )
}
