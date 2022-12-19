import React from "react";
import { useState } from "react";
//import Axios from "axios";

import PostList from "./PostList";
import PostAlbum from "./PostAlbum";
import style from "../../components/post/post.module.css";

export default function Post() {
    // accountname, 인증상태

    // authorization필요
    //Axios.get('https://mandarin.api.weniv.co.kr/profile/' + accountname)
    //.then((response) => {console.log(response.data)})
    //.catch((error)=>{console.log(error)})

    const [toggle, setToggle] = useState(true);

    const handleToggle = (toggle) => {
        if(toggle) return;
        setToggle((prev) => !prev);
    }

    return (
        <section className={style.wrap_posts}>
            {/*<h2 className="ir">포스트</h2>*/}
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
