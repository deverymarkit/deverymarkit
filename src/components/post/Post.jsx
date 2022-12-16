import React from "react";

import Card from "../../components/common/card/Card";
import PostList from "./PostList";
import PostAlbum from "./PostAlbum";
import style from "../../components/post/post.module.css";

export default function Post() {
    let postType = "btn_list";
    let onoff = "on";

    return (
        <section className={style.wrap_posts}>
            {/*<h2 className="ir">포스트</h2>*/}
            <div className={style.cont_display_btn}>
                <button type="button" className={`${style[postType]} ${style[onoff]}`} postType="btn_list"></button>
                <button type="button" className={`${style[postType]} ${style[onoff]}`} postType="btn_album"></button>
            </div>
            <div className={style.cont_card}>
            {
                postType === "postList" ? <PostList /> : <PostAlbum />
            }
            </div>
        </section>
    )
}

