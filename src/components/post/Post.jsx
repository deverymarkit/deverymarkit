import React, { useState, useEffect } from "react";
import axios from "axios";

import PostList from "./PostList";
import PostAlbum from "./PostAlbum";
import BaseURL from "../../components/common/BaseURL";
import style from "../../components/post/post.module.css";

export default function Post({ profileInfo, profileType }) {

    // 가짜 데이터
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTk2MjYwMTdhZTY2NjU4MWM1ZDA4NCIsImV4cCI6MTY3NjY4NzI5MywiaWF0IjoxNjcxNTAzMjkzfQ.nI5e_IgdnZmTHnLcBKvttP8w3AFQ2rnR6NMxAzdTF40";
    // 가짜 데이터

    const [toggle, setToggle] = useState(true);
    const [postList, setPostList] = useState([]);

    const handleToggle = (toggle) => {
        if(toggle) return;
        setToggle((prev) => !prev);
    }

    const getPostList = async () => {
        const url = BaseURL + `/post/${profileInfo.accountname}/userpost`;
        
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

