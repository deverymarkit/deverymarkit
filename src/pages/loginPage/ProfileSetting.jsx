import React, { useRef, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import style from "./profileSetting.module.css"
import defaultImg from "../../assets/imgs/profile-none.png"
import uploadImg from "../../assets/imgs/upload-img.png"
import axios from 'axios'

export default function ProfileSetting() {
    const [profileImg, setProfileImg] = useState(defaultImg);
    const [usernameWarning, setUsernameWarning] = useState('');
    const [accountWarning, setAccountWarning] = useState('');
    const [username, setUserName] = useState('')
    const [accountname, setAccountName] = useState('')
    const location = useLocation();
    const inputRef = useRef();
    const intro = useRef();
    const {email, password} = {...location.state};
    
    const handleCheckInput = (event) => {
        // Input을 체크해서 state를 변경하는 함수.
        if (event.target.name === "username") setUserName(event.target.value); 
        else if (event.target.name === "accountname") setAccountName(event.target.value);
    }

    useEffect(() => {
        // 유효성검사를 체크하는 useEffect
        const 정규표현식 = /^[_A-Za-z0-9+]*$/;
        if (username.length >= 2 && username.length <= 10) setUsernameWarning("")
        if (정규표현식.test(accountname) && accountname.length >= 4) setAccountWarning("")
    }, [username, accountname])

    const loginButton = (e) => {
        const 정규표현식 = /^[_A-Za-z0-9+]*$/;
        e.preventDefault();
        if (username.length < 2 || username.length > 10) {
            setUsernameWarning('사용자 이름은 2~10자 이내여야 합니다.')
            return
        }
        if (accountname.length < 4) {
            setAccountWarning('계정ID는 4글자 이상이어야 합니다.')
            return
        }  else if (!정규표현식.test(accountname)) {
            setAccountWarning('영문, 밑줄 및 마침표만 사용해야 합니다.')
            return
        }

        const userData = {
            "email": email,
            "password": password,
            "image": profileImg,
            "username": username,
            "accountname": accountname,
            "intro": intro.current.value
        }
    
        signUp(userData)
    }

    // axios
    const signUp = async (userdata) => {
        const url = 'https://mandarin.api.weniv.co.kr/';
        try {
            const signUpRes = axios.post(`${url}user`, {
                "user": {
                    ...userdata
                },
                "headers": {
                    "Content-Type": "application/json"
                }
            })
            const 대답 = (await signUpRes).data
            console.log(대답);
        } catch(err) { 
            const error = err.response.data
            setAccountWarning(error.message);
        }
    }

    const handleInputRef = (e) => {
        e.preventDefault()
        inputRef.current.click()
    }

    const handleGetImgUrl = (event) => {
        const image = event.target.files[0]
        getImgUrl(image)
    }

    // axios
    const getImgUrl = async (image) => {
        const url = 'https://mandarin.api.weniv.co.kr/';
        const formData = new FormData();
        formData.append('image', image);
        try {
            const imgRes = axios.post(`${url}image/uploadfile`, formData,
            {
                "headers": {
                    "Content-Type": "multipart/form-data"
                }
            })
            const imgUrl = (await imgRes).data.filename
            setProfileImg(url + `${imgUrl}`)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <section className={style.cont_profileSetting}>
            <h1 className={style.tit_profileSetting}>프로필 설정</h1>
            <p className={style.txt_profileSetting}>나중에 언제든지 변경할 수 있습니다.</p>

            <div className={style.cont_profileImg}>
                <img src={profileImg} className={style.img_profileImg} alt="프로필 사진"></img>

                <input type="file" 
                className={style.inp_file} 
                ref={inputRef}
                accept="image/*" 
                onChange={handleGetImgUrl}/>
                <div 
                className={style.div_uploadImg} 
                style={{backgroundImage: `url(${uploadImg})`}} 
                onClick={handleInputRef}>
                </div>
                
            </div>


            <form className={style.form_profileSetting}>
                <label 
                htmlFor='username' 
                className={style.label_profileSetting}
                >
                사용자 이름
                </label>

                <input 
                type="text" 
                id="username"
                name="username"
                className={style.input_profileSetting} 
                placeholder="2~10자 이내여야 합니다."
                value={username}
                onChange={handleCheckInput}>
                </input>
                <p className={style.p_warning}>{usernameWarning}</p>

                <label 
                htmlFor='accountname' 
                className={style.label_profileSetting}>
                계정 ID
                </label>

                <input 
                type="text" 
                id="accountname"
                name="accountname"
                className={style.input_profileSetting}
                placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
                value={accountname}
                onChange={handleCheckInput}>
                </input>
                <p className={style.p_warning}>{accountWarning}</p>

                <label 
                htmlFor='introInput' 
                className={style.label_profileSetting}>
                소개
                </label>

                <input 
                type="text" 
                id="introInput"
                className={style.input_profileSetting} 
                placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
                ref={intro}>
                </input>

                <button 
                className={style.btn_profileSetting}
                onClick={loginButton}>
                감귤마켓 시작하기
                </button>
            </form>
        </section>
    )
}