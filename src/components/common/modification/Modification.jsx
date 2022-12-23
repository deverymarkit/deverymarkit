import { React, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUpdate } from "../../../store.js";
import style from "./modification.module.css";
import uploadImg from "../../../assets/imgs/upload-img.png";
import onError from "../../../assets/imgs/onError.png";
import axios from "axios";
// import useCheckInput from "../../../hooks/useCheckInput.jsx";

export default function Modification({ type, mode, profileImg, setProfileImg, username, accountname,handleCheckInput}) {
    
    const defalutImg = "https://mandarin.api.weniv.co.kr/Ellipse.png";

    const [usernameWarning, setUsernameWarning] = useState('');
    const [accountWarning, setAccountWarning] = useState('');
    const location = useLocation();
    const inputRef = useRef();
    const intro = useRef();
    const dispatch = useDispatch();
    const {email, password} = {...location.state};
    // const [username, accountname, handleCheckInput] = useCheckInput(""); //커스텀훅

    const pages = {
        "profile": {
            strArr : ["사용자 이름", "계정 ID", "소개"],
            placeholder : ["2~10자 이내여야 합니다.", "영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.", "자신과 판매할 상품에 대해 소개해 주세요!"],
            usernameWarning : "사용자 이름은 2~10자 이내여야 합니다.",
            accountWarning : ["계정ID는 4글자 이상이어야 합니다.", "영문, 밑줄 및 마침표만 사용해야 합니다.'"]
            },
        "product": {
            strArr : ["상품명", "가격", "판매 링크"],
            placeholder : ["2~15자 이내여야 합니다.", "숫자만 입력 가능합니다.", "URL을 입력해 주세요."]
            // usernameWarning : "2~15자 이내여야 합니다.",
            // accountWarning : ["계정ID는 4글자 이상이어야 합니다.", "숫자만 입력 가능합니다."],
            // accountWarning : "계정ID는 4글자 이상이어야 합니다.", "숫자만 입력 가능합니다."
            }
    }


    useEffect(() => {
        // 유효성검사를 체크하는 useEffect
        const 정규표현식 = /^[_A-Za-z0-9+]*$/;
        if (type === "profile" && username.length >= 2 && username.length <= 10) setUsernameWarning("")
        if (type === "product" && username.length >= 2 && username.length <= 15) setUsernameWarning("")
        if (type === "profile" && 정규표현식.test(accountname) && accountname.length >= 4) setAccountWarning("")
    }, [username, accountname])

    useEffect(() =>{

    })

    // const loginButton = (e) => {
    //     const 정규표현식 = /^[_A-Za-z0-9+]*$/;
    //     e.preventDefault();
    //     if (username.length < 2 || username.length > 10) {
    //         setUsernameWarning(pages[type].usernameWarning)
    //         return
    //     }
    //     if (accountname.length < 4) {
    //         setAccountWarning(pages[type].accountWarning[0])
    //         return
    //     }  else if (!정규표현식.test(accountname)) {
    //         setAccountWarning(pages[type].accountWarning[1])
    //         return
    //     }
    //     const UID = {
    //         "email": email,
    //         "password": password
    //     }
    //     const userData = {
    //         "image": profileImg,
    //         "username": username,
    //         "accountname": accountname,
    //         "intro": intro.current.value
    //     }

    //     const totalUser = {UID, ...userData};
        
    //     mode === "setting" ? profileModify(userData) : signUp(totalUser);  


    // }

    // axios
    const profileModify = async (userData) => {
        const url = 'https://mandarin.api.weniv.co.kr/';
        try {
            const signUpRes = axios.put(`${url}user`, {
                "user": {
                    ...userData
                },
                "headers": {
                    "Authorization" : "Bearer {token}",
                    "Content-type" : "application/json"
                }
            })
            const signUpdata = (await signUpRes).data
            console.log(signUpdata);
            getLogin(email, password)

        } catch(err) { 
            const error = err.response.data
            setAccountWarning(error.message);
        }
    }

    // axios
    const signUp = async (totalUser) => {
        const url = 'https://mandarin.api.weniv.co.kr/';
        try {
            const signUpRes = axios.post(`${url}user`, {
                "user": {
                    ...totalUser
                },
                "headers": {
                    "Content-Type": "application/json"
                }
            })
            const signUpdata = (await signUpRes).data
            console.log(signUpdata);
            getLogin(email, password)

        } catch(err) { 
            const error = err.response.data
            setAccountWarning(error.message);
        }
    }

    const getLogin = async (email, password) => {
        const url = 'https://mandarin.api.weniv.co.kr/';
        const userdata = {
            "email": email,
            "password": password
        }
        try {
            const loginRes = axios.post(`${url}user/login`, {
                "user": {
                    ...userdata
                },
                "headers": {
                    "Content-Type": "application/json"
                }
            });

            const loginUserData = (await loginRes).data.user
            console.log(loginUserData);
            // if (loginData.data.status === 422) {
            //     setLoginWarning(loginData.data.message)
            //     return
            // };

            if (loginUserData) {
                dispatch(loginUpdate(loginUserData));
                if (localStorage.getItem("loginStorage")) {
                    localStorage.removeItem("loginStorage")
                }
                localStorage.setItem("loginStorage", JSON.stringify({...loginUserData}))
            };

        } catch(err) {
            console.log(err);
        }
    }
    const handleImgError = (e) => {
        e.target.src = type === "profile" ? defalutImg : onError;
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
            <div className={`${style.cont_Img} ${style[type]}`}>
            <img src= {profileImg} onError={handleImgError} className={`${style.img_modification} ${style[type]}`} alt="프로필 사진"></img>
                <input type="file" 
                className={style.inp_file} 
                ref={inputRef}
                accept="image/*" 
                onChange={handleGetImgUrl}/>
                <img className={style.img_uploadImg} src={uploadImg} alt="" onClick={handleInputRef}/>
                
            </div>

            <form className={style.form_profileSetting}>
                <label 
                htmlFor='username' 
                className={style.label_profileSetting}
                >
                {pages[type].strArr[0]}
                </label>

                <input 
                type="text" 
                id="username"
                name="username"
                className={style.input_profileSetting} 
                placeholder={pages[type].placeholder[0]}
                value={username}
                onChange={handleCheckInput}>
                </input>
                <p className={style.p_warning}>{usernameWarning}</p>

                <label 
                htmlFor='accountname' 
                className={style.label_profileSetting}>
                {pages[type].strArr[1]}
                </label>

                <input 
                type={type==="profile"? "text" : "number"} 
                id="accountname"
                name="accountname"
                className={style.input_profileSetting}
                placeholder={pages[type].placeholder[1]}
                value={accountname}
                onChange={handleCheckInput}>
                </input>
                <p className={style.p_warning}>{accountWarning}</p>

                <label 
                htmlFor='introInput' 
                className={style.label_profileSetting}>
                {pages[type].strArr[2]}
                </label>

                <input 
                type="text" 
                id="introInput"
                className={style.input_profileSetting}
                onChange={handleCheckInput}
                placeholder={pages[type].placeholder[2]}
                ref={intro}>
                </input>

                { mode==="setting" && (
                <button 
                className={style.btn_profileSetting}
                >
                감귤마켓 시작하기
                </button>)}
            </form>
        </section>
    )
}
