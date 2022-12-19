import React from "react";
import BlankComponent from "../../components/blankComponent/BlankComponent";

export default function Home() {
    // 민약 팔로잉이 없으면 BlankComponent 있으면 리스트 출력
    return (
        <>
            {/* 헤더 */}
            <BlankComponent type="home" />
            {/* 네비바 */}
        </>
    );
}
