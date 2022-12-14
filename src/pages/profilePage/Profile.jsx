import React from "react";

import UserfileInfo from "../../components/profile/UserInfo";
import Product from "../../components/product/Product";
import proStyle from "./profile.module.css";

export default function Profile() {
  return (
    <div className={proStyle.wrap_profile}>
        <nav>공통된 헤더바</nav>
        <main className={proStyle.main_profile}>
            <UserfileInfo />
            <Product />
            <section>포스트 컴포넌트</section>
        </main>
        <nav>공통 바텀(네브)</nav>
    </div>
  )
}