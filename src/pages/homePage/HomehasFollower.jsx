import React from "react";
import profileNone from "../../assets/imgs/profile_none.png";
import style from "./HomehasFollower.module.css";
import Card from "../../components/common/post/Card";

export default function HomehasFollower() {
    return (
        <section className={style.cont_hasFollower}>
            {[1, 2, 3].map(() => (
                <Card />
            ))}
        </section>
    );
}
