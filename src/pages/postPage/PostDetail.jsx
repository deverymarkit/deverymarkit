import React from "react";
import Comment from "../../components/comment/Comment";
import Card from "../../components/common/post/Card";

export default function Post() {
    return (
        <div>
            {/* <BasicHeader/> */}
            <Card/>
            <Comment/>
        </div>
    );
}
