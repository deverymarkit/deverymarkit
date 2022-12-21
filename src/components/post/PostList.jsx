import React from "react";

import PostCard from "../common/card/PostCard";

export default function PostList({ postList }) {
    return (
        postList.map((post, id) =>
            <li>
                <PostCard id={id} post={post}/>
            </li>
        )
    )
}
