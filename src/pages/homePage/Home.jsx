import React, {useEffect, useState} from "react";
import style from "./home.module.css"
import BlankComponent from "../../components/common/blankComponent/BlankComponent";
import Header from "../../components/common/header/Header";
import PostCard from "../../components/common/card/PostCard";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/navbar/Navbar";
import Loading from "../Loading";
import { customAuthAxios } from "../../api/customAxios.js"

export default function Home() {
    const loginInfo = JSON.parse(localStorage.getItem('loginStorage'))
    const [isLoading, setIsLoading] = useState(true);
    const [feedInfo, setFeedInfo] = useState(null);
    const navigate = useNavigate()

    const getFeedInfo = async () => {
        try {
            const feedRes = customAuthAxios.get("/post/feed")
            const result = (await feedRes).data.posts;
            setFeedInfo(result)
            setIsLoading(false)
        } catch(err) {
            console.error(err)
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
                            <li key={post.id}>
                                <PostCard id={id} post={post}/>
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
