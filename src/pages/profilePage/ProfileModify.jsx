import React, { useState } from "react";
import style from "./profileModify.module.css";
import Header from "../../components/common/header/Header.jsx";
import ProfilePhoto from "../../components/profile/ProfilePhoto.jsx";
import LabelTextInput from "../../components/profile/LabelTextInput.jsx";
import { customAuthAxios } from "../../api/customAxios.js"

export default function ProfileModify() {
    const loginInfo = JSON.parse(localStorage.getItem('loginStorage'));

    const [profiledata, setProfiledata] = useState({
        username: loginInfo.username,
        accountname: loginInfo.accountname,
        intro: loginInfo.intro,
        image: loginInfo.image
    })

    const handleInput = (event) => {
        const inputName = event.target.name
        if (inputName === "username") setProfiledata({...profiledata, "username": event.target.value})
        else if (inputName === "accountname") setProfiledata({...profiledata, "accountname": event.target.value})
        else if (inputName === "intro") setProfiledata({...profiledata, "intro": event.target.value})
    }

    const handleModifyButton = async (newData) => {
        try {
            const profileRes = customAuthAxios.put("/user", {
                "user": {
                    ...newData
                }
            })
            const modifedData = (await profileRes).data.user
            modifyStorage(loginInfo, modifedData)
        } catch (err) {
            console.error(err)
        }
    }

    const modifyStorage = (oldData, newData) => {
        const modifyInfo = {...oldData, "username": newData.username, "accountname": newData.accountname, "intro": newData.intro, "image": newData.image}
        localStorage.setItem("loginStorage", JSON.stringify({...modifyInfo}))
    }

    return (
        <>
            <Header type = "modification" handleHeaderBtn={() => {handleModifyButton(profiledata)}}/>
            <section className={style.cont_profile}>
                <ProfilePhoto 
                profiledata={profiledata}
                setProfiledata={setProfiledata}
                imgUrl={profiledata.image} />
                <form className={style.form_profileSetting}>
                    <LabelTextInput 
                    inputname="username" 
                    labelname="사용자 이름" 
                    placeholder="2~10자 이내여야 합니다." 
                    handleInput={handleInput}
                    inputValue={profiledata.username}/>
                    <p className={style.p_warning}>유저워닝</p>

                    <LabelTextInput 
                    inputname="accountname" 
                    labelname="계정 ID" 
                    placeholder="영문, 숫자, 특수문자(.), (_)만 사용 가능합니다." 
                    handleInput={handleInput}
                    inputValue={profiledata.accountname}/>
                    <p className={style.p_warning}>유저워닝</p>
                    
                    <LabelTextInput 
                    inputname="intro" 
                    labelname="소개" 
                    placeholder="자신과 판매할 상품에 대해 소개해 주세요!" 
                    handleInput={handleInput}
                    inputValue={profiledata.intro}/>
                </form>
            </section>
        </>
    )
}