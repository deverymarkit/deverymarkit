import React from "react";
import "./home.module.css";

export default function Home() {
    return (
        <div>
            <header className="topMainNav">
                <h1>데브리마Kit 피드</h1>
                <button type="button"></button>
            </header>
            <main className="homeContent_nonFeed">
                <p>유저를 검색해 팔로우 해보세요!</p>
                <button type="button" className="searchBtn">
                    검색하기
                </button>
            </main>
        </div>
    );
}
