import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUpdate } from "../../store.js";
import style from "./profileSetting.module.css";
import ProfilePhoto from '../../components/profile/ProfilePhoto.jsx';
import LabelTextInput from '../../components/profile/LabelTextInput.jsx';
import { customAxios } from "../../api/customAxios.js"

export default function ProfileSetting() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {email, password} = {...location.state};
    const defalutImg = "https://api.mandarin.weniv.co.kr/Ellipse.png";
    const [profiledata, setProfiledata] = useState({
        "username": "",
        "email": email,
        "password": password,
        "accountname": "",
        "intro": "",
        "image": defalutImg
    })
    const [usernameWarning, setUsernameWarning] = useState('');
    const [accountWarning, setAccountWarning] = useState('');
    const [signUpWarning, setSignUpWarning] = useState('');
    const [isValid, setIsValid] = useState(false)
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

    const signUp = async (userdata) => {
        try {
            await customAxios.post("/user", {
                "user": {
                    ...userdata
                }
            })
            getLogin(userdata)

        } catch(err) {
            setSignUpWarning(err.response.data.message);
        }
    }

    const getLogin = async (userdata) => {
        try {
            const loginRes = await customAxios.post("/user/login", {
                "user": {
                    ...userdata
                }
            })
            const loginData = loginRes.data.user
            dispatch(loginUpdate(loginData))
            setStorage(loginData)
            navigate("/")
        } catch(err) {
            console.error(err)
        }
    }

    const setStorage = (data) => {
        const loginInfo = {
            ...data
        }
        localStorage.removeItem("loginStorage")
        localStorage.setItem("loginStorage", JSON.stringify({...loginInfo}));
    }

    useEffect(() => {
        const username = profiledata.username;
        const timer = setTimeout(() => {
            usernameValidCheck(username, setUsernameWarning, setValid)
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
        if (valid.usernameValid === true && valid.accountValid === true) setIsValid(true);
        else setIsValid(false);
    }, [valid]);

    const handleInput = (event) => {
        const inputName = event.target.name
        if (inputName === "username") setProfiledata({...profiledata, "username": event.target.value});
        else if (inputName === "accountname") setProfiledata({...profiledata, "accountname": event.target.value});
        else if (inputName === "intro") setProfiledata({...profiledata, "intro": event.target.value});
    }
    
    return (
        <section className={style.cont_profileSetting}>
            <h1 className={style.tit_profileSetting}>프로필 설정</h1>
            <p className={style.txt_profileSetting}>나중에 언제든지 변경할 수 있습니다.</p>
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


                <button 
                className={style.btn_profileSetting}
                disabled={isValid ? false : true}
                onClick={(event) => {
                    event.preventDefault();
                    signUp(profiledata);
                }}>
                데브리마킷 시작하기
                </button>
                <p className={style.p_warningFinal}>{signUpWarning}</p>
            </form>
        </section>
    )
}