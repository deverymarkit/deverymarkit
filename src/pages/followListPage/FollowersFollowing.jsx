import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BASE_URL from "../../components/common/BaseURL";
import ProfileCard from "../../components/common/card/ProfileCard";
import Header from "../../components/common/header/Header";
import style from "./followersFollowing.module.css";

export default function FollowerFollowing() {

    const navigate = useNavigate();
    const handleProfile = (postauthor) => {
        navigate(`/profile/${postauthor}`)
    }

    const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
    const token = loginInfo.token;
    const { accountname, followtype } = useParams();

    const [followList, setFollowList] = useState([]);

    const getFollowList = async () => {
        const url = BASE_URL + `/profile/${accountname}/${followtype}/?limit=100&skip=0`;

        try {
            const followRes = axios.get(url, {
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })
            const result = await followRes;
            setFollowList(result.data);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getFollowList();
    }, []);

    return (
        <>
            <Header type={followtype}/>
            <section className={style.wrap_follow}>
                <h2 className="ir">{followtype}목록</h2>
                <div className={style.cont_follow}>
                    <ol>
                    {
                        followList.map((data) =>
                            <ProfileCard 
                                profileImg={data.image} 
                                profileState="follow" 
                                profileName={data.username} 
                                profileCont={data.intro}
                                profileAccount={data.accountname}
                                isfollow={data.isfollow}
                                handleBtn={()=>{handleProfile(data.accountname)}}
                            />
                        )
                    }
                    </ol>
                </div>
            </section>
        </>
    )
}
