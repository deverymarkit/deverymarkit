import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "../../components/common/card/ProfileCard";
import Header from "../../components/common/header/Header";
import style from "./search.module.css";
import Navbar from "../../components/common/navbar/Navbar";
import axios from "axios";
import BaseURL from "../../components/common/BaseURL";
import useCustomTopBtn from "../../hooks/useCustomTopBtn";

export default function Search() {
    const loginInfo = JSON.parse(localStorage.getItem('loginStorage'));
    const [keyword, setKeyword] = useState("");
    const [뿌려주기, set뿌려주기] = useState([]);
    const [데이터, set데이터] = useState([]);
    const [인덱스, set인덱스] = useState(0);
    const [showButton ,scrollToTop] = useCustomTopBtn();
    const observeRef = useRef();

    const handleSearchKeyword = (event) => {
        setKeyword(event.target.value);
    }

    const callbackFunction = (entries) => {
        const [entry] = entries;
        if (데이터.length > 인덱스 && entry.isIntersecting) {
            set인덱스(인덱스 + 20);
        }
    }

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    }

    const searchAxios = async () => {
        const token = loginInfo.token;
        if (keyword === "") {
            set뿌려주기([]);
            set데이터([]);
            return
        }
        try {
            const searchRes = axios.get(BaseURL + `/user/searchuser/?keyword=${keyword}`, {
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })
            const searchData = await searchRes;
            set인덱스(20);
            set뿌려주기([]);
            set데이터(searchData.data);
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        const timer = setTimeout(() => {
            searchAxios();
        }, 300)
        return () => clearTimeout(timer)
    }, [keyword]);

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        if (observeRef.current) observer.observe(observeRef.current);
        return () => {
            if(observeRef.current) observer.unobserve(observeRef.current);
        }
    }, [observeRef, options]);

    useEffect(() => {
        const 사본 = [...뿌려주기];
        사본.push(...데이터.slice(인덱스 - 20, 인덱스));
        set뿌려주기(사본);
    }, [데이터, 인덱스]);

    return (
        <>
            <Header type="search" handleHeaderBtn={handleSearchKeyword}/>
                <ul className={style.ul_search}>
                    {뿌려주기.map((data, id) =>
                        <li key={id}>
                        <ProfileCard
                            profileAccount={data.accountname} 
                            isfollow={data.isfollow} 
                            profileImg={data.image} 
                            profileName={data.username} 
                            profileState="search"
                            profileCont={data.intro} 
                            profileId={data.id}/>
                        </li>
                        )}
                    <li ref={observeRef} className="ir">더보기</li>
                </ul>
                {showButton && <aside className="scroll_cont">
                                    <button className="top_btn" onClick={scrollToTop}>top</button>
                                </aside>
                }
            <Navbar type="search" />
        </>
    );
}
