import React from "react";

import Card from "../../components/common/card/Card";
import style from "../../components/post/post.module.css";

export default function PostList() {
  return (
    <>
        <div className={style.cont_card}>
            {
                [1, 2, 3].map(() =>
                    <Card />
                )
            }
        </div>
    </>
  )
}
