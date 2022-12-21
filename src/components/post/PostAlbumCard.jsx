import React from "react";

import style from "./post.module.css";

export default function PostAlbumCard({ id, profileInfo, post, state }) {
    return (
        <li key={id} className={style.box_album_post}>
            <img src={post.image} alt="" />
        </li>
    )
}
