import React from "react";
import { useState } from "react";

import PostList from "./PostList";
import PostAlbum from "./PostAlbum";
import style from "../../components/post/post.module.css";

export default function Post() {

    const [toggle, setToggle] = useState(true);
    
    const handleToggle = (toggle) => {
        if(toggle) return;
        setToggle((prev) => !prev);
    }

    return (
        <section className={style.wrap_posts}>
            <h2 className="ir">포스트</h2>
            <div className={style.cont_display_btn}>
                <button type="button" className={`${style.btn_list} ${toggle ? style.on : style.off}`} onClick={()=>{handleToggle(toggle)}}></button>
                <button type="button" className={`${style.btn_album} ${toggle ? style.off : style.on}`} onClick={()=>{handleToggle(!toggle)}}></button>
            </div>
            <div className={style.cont_card}>
            {
                toggle ? <PostList /> : <PostAlbum />
            }
            </div>
        </section>
    )
}

