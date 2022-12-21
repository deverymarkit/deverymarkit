import React from "react";

import PostAlbumCard from "./PostAlbumCard";
import style from "./post.module.css";

export default function PostAlbum({ profileInfo, postList, state }) {
    return (
        postList.map((post, id) =>
            <PostAlbumCard key={id} profileInfo={profileInfo} post={post} state={state}/>
        )
    )
}
