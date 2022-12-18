import React from "react";

import UserInfo from "../../components/profile/UserInfo";
import Product from "../../components/product/Product";
import Card from "../../components/common/post/Card";
import style from "./profile.module.css";

export default function Profile() {
  return (
        <main className={style.main_profile}>
            <UserInfo />
            <Product />
            <section className={style.wrap_posts}>
              {/*<h2 className="ir">포스트</h2>*/}
              <div className={style.cont_display_btn}>
                  리스트형 갤러리형
              </div>
              <div className={style.cont_card}>
                {
                    [1, 2, 3].map(() =>
                        <Card />
                    )
                }
              </div>
            </section>
        </main>
  )
}