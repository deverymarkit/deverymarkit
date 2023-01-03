import React from "react";

import PostCard from "../common/card/PostCard";

export default function PostList({ postList }) {
    return (
        postList.map((post) =>
            <li key={post.id}>
                <PostCard post={post}/>
            </li>
        )
    )
}
