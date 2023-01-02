import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { customAuthAxios } from "../../api/customAxios";
import ProfileCard from "../../components/common/card/ProfileCard";
import Header from "../../components/common/header/Header";
import style from "./followersFollowing.module.css";

export default function FollowerFollowing() {

    const navigate = useNavigate();
    const handleProfile = (postauthor) => {
        navigate(`/profile/${postauthor}`)
    }

    const { accountname, followtype } = useParams();
    const [followList, setFollowList] = useState([]);

    const getFollowList = async () => {

        try {
            const followRes = customAuthAxios.get(`/profile/${accountname}/${followtype}/?limit=100&skip=0`);
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
                            <ProfileCard key={data._id}
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
