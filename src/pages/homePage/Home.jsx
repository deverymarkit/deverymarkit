import React, {useEffect, useState} from "react";
import style from "./home.module.css"
import BlankComponent from "../../components/blankComponent/BlankComponent";
import Header from "../../components/common/header/Header";
import BaseURL from "../../components/common/BaseURL"
import axios from "axios";
import PostCard from "../../components/common/card/PostCard";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/navbar/Navbar";
import Loading from "../Loading";

export default function Home() {
    // 로딩하는 것을 이용해서 일단 자료를 먼저 불러옴.
    // 로딩이 완료되었을 때 팔로잉이 있으면 뿌려주고 없으면 블랭크 날림
    // 만약 팔로잉이 없으면 BlankComponent 있으면 리스트 출력
    const loginInfo = JSON.parse(localStorage.getItem('loginStorage'))
    const [isLoading, setIsLoading] = useState(true);
    const [feedInfo, setFeedInfo] = useState(null);
    const navigate = useNavigate()

    if (loginInfo) {

    } else {
        console.log('splash로 보내버리는 로직')
    }

    const getFeedInfo = async () => {
        const url = BaseURL + `/post/feed`
        const token = loginInfo.token
        try {
            const feedRes = axios.get(url, {
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json",
                }
            })
            const result = await feedRes;
            console.log(result.data.posts.length === 0);
            setFeedInfo(result.data.posts)
            setIsLoading(false)

        } catch(err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (loginInfo) getFeedInfo()
        else navigate('/')
    }, [])

    if (isLoading) {
        return <Loading type="loading"/>
    } else {
        return (
            <>
            <Header type="home" />
            <section className={style.wrap_posts}>
                <h2 className="ir">피드 화면</h2>
                {
                    feedInfo.length === 0 ? <BlankComponent type="home" /> :
                    <ol className={style.ol_post}> 
                        {feedInfo.map((post, id) => 
                            <li>
                                <PostCard id={id} post={post} />
                            </li>
                        )}
                    </ol>
                }
            </section>
            <Navbar type={"home"}/>
            </>
        )
    }
}
