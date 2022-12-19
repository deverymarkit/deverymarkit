import React from "react";

import PostCard from "../common/card/PostCard";
import style from "../../components/post/post.module.css";

export default function PostList() {
    return (
        <>
            {
                [1, 2, 3].map(() =>
                    <PostCard />
                )
            }
        </>
    )
}
