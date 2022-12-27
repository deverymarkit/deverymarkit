import React from "react";
import { useLocation } from "react-router-dom";

import Comment from "../../components/comment/Comment";
//import CommentList from "../../components/comment/CommentList";

import Header from "../../components/common/header/Header";
import PostCard from "../../components/common/card/PostCard";
import style from "./postDetail.module.css";

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
            
       

        

    const location = useLocation();
    const id = location.state.id;
    const post = location.state.post;

    const location = useLocation();
    const id = location.state.id;
    const post = location.state.post;

    return (
        <>
            <Header type="post"/>
            <main className={style.wrap_post_detail}>
                <section className={style.cont_post_detail}>
                    <h2 className="ir">게시글 상세보기</h2>
                    <PostCard id={id} post={post}/>
                </section>
                <section className={style.cont_post_comment}>
                    <h2 className="ir">댓글</h2>
                    <Comment post={post}/>
                </section>
            </main>
        </>
    )
}