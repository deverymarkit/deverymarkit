import React from "react";

import PostCard from "../common/card/PostCard";

export default function PostList({ profileInfo, postList, state }) {
    return (
        postList.map((post, id) =>
            <li>
                <PostCard key={id} profileInfo={profileInfo} post={post} state={state}/>
            </li>
        )
    )
}
