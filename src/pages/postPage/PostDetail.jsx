import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comment from "../../components/comment/Comment";
import PostCard from "../../components/common/card/PostCard";
import BaseURL from "../../components/common/BaseURL";
import style from "./postDetail.module.css";
import Header from "../../components/common/header/Header";

export default function PostDetail() {
    const { postid } = useParams();
    console.log("🚀 ~ file: PostDetail.jsx:12 ~ PostDetail ~ postId", postid)
    const [userToken, setUserToken] = useState("");
    
    useEffect(() => {
        const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
        const userToken = loginInfo.token;
        setUserToken(userToken);
        console.log("🚀 ~ file: PostDetail.jsx:20 ~ useEffect ~ userToken", userToken)
        
        
        getData()
    }, []);

        // axios
        const getData = async () => {
                const url = BaseURL + `/post/${postid}`;
            
                try {
                    const postRes = await axios(url, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWMwNzAzMTdhZTY2NjU4MWM2NDhlYiIsImV4cCI6MTY3NzE3Njc3MiwiaWF0IjoxNjcxOTkyNzcyfQ.kUTpkFyuo57uK90f5bQ2JM8si9tPSKQzIPB6WQzgaeg",
                            "Content-type": "application/json",
                        },
                    });
                    const post = (await postRes).data.post
                    console.log("🚀 ~ file: PostDetail.jsx:34 ~ getData ~ post", post)
                    
                    return post            
                    // console.log(productUpdata);
                } catch(err) { 
                    const error = err.response.data
                    alert(error.message);
                }
                
            
                }
            
       

        

    return (
        <>
            <Header type="post"/>
            <main>
                <div className="">
                    <PostCard id={postid} post = {getData()} />
                    <Comment/>
                </div>
            </main>
        </>
    )
}