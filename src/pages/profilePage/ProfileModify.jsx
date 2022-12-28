import React, { useEffect, useState } from "react";
import style from "./profileModify.module.css";
import Header from "../../components/common/header/Header.jsx";
import ProfilePhoto from "../../components/profile/ProfilePhoto.jsx";
import LabelTextInput from "../../components/profile/LabelTextInput.jsx";
import { customAuthAxios } from "../../api/customAxios.js"
import { useNavigate } from "react-router-dom";

export default function ProfileModify() {
    const navigate = useNavigate()
    const loginInfo = JSON.parse(localStorage.getItem('loginStorage'));
    const [profiledata, setProfiledata] = useState({
        username: loginInfo.username,
        accountname: loginInfo.accountname,
        intro: loginInfo.intro,
        image: loginInfo.image
    });

    const [usernameWarning, setUsernameWarning] = useState('');
    const [accountWarning, setAccountWarning] = useState('');

    const [IsValue, setIsValue] = useState(true)
    const [valid, setValid] = useState({
        usernameValid : true,
        accountValid : true
    })

    const usernameValidCheck = (username, setUsernameWarning, setValid) => {
        if (username.length < 2 || username.length > 10) {
            setUsernameWarning("사용자 이름은 2~10자 이내여야 합니다.");
            setValid({...valid, usernameValid: false});
        } else {
            setUsernameWarning("");
            setValid({...valid, usernameValid: true});
        }
    }

    const accountValidCheck = (account, setAccountWarning, setValid) => {
        const 정규표현식 = /^[_A-Za-z0-9+]*$/;
        if (!정규표현식.test(account)) {
            setAccountWarning("영문, 밑줄 및 마침표만 사용해야 합니다.");
            setValid({...valid, accountValid: false});
        } else if (account.length < 4) {
            setAccountWarning('계정ID는 4글자 이상이어야 합니다.');
            setValid({...valid, accountValid: false});
        } else {
            setAccountWarning("")
            setValid({...valid, accountValid: true});
        }
    }

    const handleInput = (event) => {
        const inputName = event.target.name
        if (inputName === "username") setProfiledata({...profiledata, "username": event.target.value});
        else if (inputName === "accountname") setProfiledata({...profiledata, "accountname": event.target.value});
        else if (inputName === "intro") setProfiledata({...profiledata, "intro": event.target.value});
    }

    const handleModifyButton = async (newData, setStorage) => {
        if (!IsValue) return

        try {
            const profileRes = customAuthAxios.put("/user", {
                "user": {
                    ...newData
                }
            })
            const modifedData = (await profileRes).data.user;
            setStorage(loginInfo, modifedData);
            navigate(-1)
        } catch (err) {
            console.error(err);
        }
    }

    const modifyStorage = (oldData, newData) => {
        const modifyInfo = {...oldData, 
            "username": newData.username, 
            "accountname": newData.accountname, 
            "intro": newData.intro, 
            "image": newData.image
        }
        localStorage.setItem("loginStorage", JSON.stringify({...modifyInfo}));
    }

    // 유효성 검사 추가 + 버튼 활성화
    useEffect(() => {
        const username = profiledata.username;
        // const accountname = profiledata.accountname

        const timer = setTimeout(() => {
            usernameValidCheck(username, setUsernameWarning, setValid)
            // accountValidCheck(accountname, setAccountWarning, setValid)
        }, 300);
        return () => clearTimeout(timer);
    }, [profiledata.username]);

    useEffect(() => {
        const accountname = profiledata.accountname;

        const timer = setTimeout(() => {
            accountValidCheck(accountname, setAccountWarning, setValid)
        }, 300);
        return () => clearTimeout(timer);
    }, [profiledata.accountname]);

    useEffect(() => {
        if (valid.usernameValid === true && valid.accountValid === true) setIsValue(true);
        else setIsValue(false);
        console.log(valid);
    }, [valid]);

    return (
        <>
            <Header type="modification" IsValue={IsValue} handleHeaderBtn={() => {handleModifyButton(profiledata, modifyStorage)}}/>
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
                    <p className={style.p_warning}>{usernameWarning}</p>

                    <LabelTextInput 
                    inputname="accountname" 
                    labelname="계정 ID" 
                    placeholder="영문, 숫자, 특수문자(.), (_)만 사용 가능합니다." 
                    handleInput={handleInput}
                    inputValue={profiledata.accountname}/>
                    <p className={style.p_warning}>{accountWarning}</p>
                    
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