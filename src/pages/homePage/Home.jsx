import React from "react";
import BlankComponent from "../../components/blankComponent/BlankComponent";
import Header from "../../components/common/header/Header";


export default function Home() {
    // 민약 팔로잉이 없으면 BlankComponent 있으면 리스트 출력
    return (
        <>
            <Header type="home"/>
            <BlankComponent type="home" />
            {/* 네비바 */}
        </>
    );
}