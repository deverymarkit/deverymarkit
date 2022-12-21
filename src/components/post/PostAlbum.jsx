import React from "react";

import PostAlbumCard from "./PostAlbumCard";
import style from "./post.module.css";

export default function PostAlbum({ postList }) {
    return (
        postList.map((post, id) =>
            <PostAlbumCard key={id} post={post}/>
        )
    )
}
