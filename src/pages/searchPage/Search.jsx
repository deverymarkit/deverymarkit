import React, { useEffect, useState } from "react";
import ProfileNone from "../../components/common/BasicProfileImg";
import ProfileCard from "../../components/common/card/ProfileCard";
import Header from "../../components/common/header/Header";
import style from "./search.module.css";
import Navbar from "../../components/common/navbar/Navbar";
import axios from "axios";
import BaseURL from "../../components/common/BaseURL"

export default function Search() {
    const loginInfo = JSON.parse(localStorage.getItem('loginStorage'))
    const [keyword, setKeyword] = useState("")
    const [데이터, set데이터] = useState([])

    const searchAxios = async () => {
        const token = loginInfo.token
        if (keyword === "") return

        try {
            const searchRes = axios.get(BaseURL + `/user/searchuser/?keyword=${keyword}&limit=20&skip=0`, {
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })

            const searchData = await searchRes;
            console.log(searchData);
            set데이터(searchData.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        searchAxios()
    }, [keyword])

    return (
        <>
        <Header type="search" setKeyword={setKeyword}/>
        {/* {데이터.map((data, i) => 
            <ProfileCard profileInfo={data} key={i} profileImg={데이터.image} />
        )} */}
        <Navbar type="search" />
        </>
    );
}
