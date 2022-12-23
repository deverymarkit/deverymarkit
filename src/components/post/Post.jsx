import React, { useState, useEffect } from "react";
import axios from "axios";

import PostList from "./PostList";
import PostAlbum from "./PostAlbum";
import BASE_URL from "../../components/common/BaseURL";
import style from "../../components/post/post.module.css";

export default function Post({ profileInfo, profileType }) {

    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const token = loginInfo.token;

    const [toggle, setToggle] = useState(true);
    const [postList, setPostList] = useState([]);

    const handleToggle = (toggle) => {
        if(toggle) return;
        setToggle((prev) => !prev);
    }

    const getPostList = async () => {
        const url = BASE_URL + `/post/${profileInfo.accountname}/userpost`;
        
        try {
            const postRes = axios.get(url, {
                "headers": {
                    "Authorization": `Bearer ${token}`,  
                    "Content-type": "application/json",
                }
            })
            const result = await postRes;
            setPostList(result.data.post);
        } catch(err) {
            console.error(err);
        }
    }
    
    useEffect(()=>{
        getPostList();
    }, [])
   
    return (
        <>
            {
                postList.length > 0 ? (
                    <section className={style.wrap_posts}>
                        <h2 className="ir">게시글</h2>
                        <div className={style.cont_display_btn}>
                            <button type="button" className={`${style.btn_list} ${toggle ? style.on : style.off}`} onClick={()=>{handleToggle(toggle)}}></button>
                            <button type="button" className={`${style.btn_album} ${toggle ? style.off : style.on}`} onClick={()=>{handleToggle(!toggle)}}></button>
                        </div>
                        <ol className={`${toggle ? style.ol_listview : style.ol_albumview}`}>
                        {
                            toggle ? <PostList postList={postList}/> : <PostAlbum postList={postList}/>
                        }
                        </ol>
                    </section>
                ) : null
            }
        </>
    )
}

