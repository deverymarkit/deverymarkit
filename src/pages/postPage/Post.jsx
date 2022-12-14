import React from "react";
import CommentInput from "../../components/comment/CommentInput";
import CommentList from "../../components/comment/CommentList";
import PostList from "../../components/common/post/PostList";

export default function Post() {
    return (
        <div>
            {/* <BasicHeader/> */}
            <PostList/>
            <CommentList />
            <CommentInput />
        </div>
    );
}
