import React from "react";
import CommentInput from "../../components/comment/CommentInput";
import CommentList from "../../components/comment/CommentList";
import HomePost from "../../components/hompost/HomePost";

export default function Post() {
    return (
        <div>
            <HomePost />
            <CommentList />
            <CommentInput />
        </div>
    );
}
