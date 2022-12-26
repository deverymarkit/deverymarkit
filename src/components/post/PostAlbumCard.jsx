import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./post.module.css";

export default function PostAlbumCard({ id, post }) {

    const[isMulti, setIsMulti] = useState(false);

    const navigate = useNavigate();
    const handlePostDetail = () => {
        navigate(`/post/${post.id}`)
    }

    useEffect(() => {
        if (post.image.split(",").length > 1) {
            setIsMulti(true);
        }
    }, [])

    let imgSrc = post.image.split(",")[0];
    //console.log(imgSrc);

    return (
        <li key={post.id} className={`${style.box_album_post} ${isMulti ? style.img_multi : ""}`}>
            {
                post.image ? ( <img src={imgSrc} alt="" onClick={handlePostDetail}/> ) : null
            }
        </li>
    )
}
