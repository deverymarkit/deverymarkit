import React from "react";

import ProfileInfo from "../../components/profile/ProfileInfo";
import SaleProduct from "../../components/product/SaleProduct";

export default function Profile() {
  return (
    <>
        <nav>공통된 헤더바</nav>
        <main>
            <ProfileInfo />
            <SaleProduct />
            {/*<ProfilePost />*/}
        </main>
        <nav>공통 바텀(네브)</nav>
    </>
  )
}
