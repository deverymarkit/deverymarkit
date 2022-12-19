import React from "react";
import ProfileNone from "../../components/common/BasicProfileImg";
import style from "./search.module.css";

export default function Search() {
    return (
        <div className={style.cont_search}>
            <section className={style.cont_profile}>
                <ProfileNone type="userList" />
                <p className={style.tit_user_name}>
                    애월읍 위니브 감귤농장
                    <span className={style.tit_user_id}>@weniv_electronic</span>
                </p>
            </section>
        </div>
    );
}
