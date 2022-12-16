import React from "react";
<<<<<<< HEAD
=======
import style from "./home.module.css";
import bulbBlackImg from "../../assets/imgs/bulb_black.png";
>>>>>>> 5be8d0a1ac83a7a60947268cdb56706e55bfc591

export default function Home() {
    return (
        <section className={style.cont_home}>
            <main className="homeContent_nonFeed">
                <img src={bulbBlackImg} className={style.img_bulbBlack}></img>
                <p className={style.txt_user}>유저를 검색해 팔로우 해보세요!</p>
                <button type="button" className={style.searchBtn}>
                    검색하기
                </button>
            </main>
        </section>
    );
}
