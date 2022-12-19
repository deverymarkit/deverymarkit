import React, { useRef, useState } from "react"
import style from "./profileSetting.module.css"
import profileImg from "../../assets/imgs/profile-none.png"
import uploadImg from "../../assets/imgs/upload-img.png"
import axios from 'axios'

export default function ProfileSetting() {
    const [그림, set그림] = useState(profileImg)

    const inputRef = useRef()
    const clickTest = () => {
        inputRef.current.click()
    }

    const changeTest = (event) => {
        const image = event.target.files[0]
        액시오스(image)
    }

    // axios
    const 액시오스 = async (image) => {
        const url = 'https://mandarin.api.weniv.co.kr'
        const formData = new FormData()
        formData.append('image', image)
        try {
            const 대답 = axios.post(`${url}/image/uploadfile`, formData,
            {
                "headers": {
                    "Content-Type": "multipart/form-data"
                }
            })
            const bb = await 대답
            console.log(bb.data.filename)
            set그림(`https://mandarin.api.weniv.co.kr/${bb.data.filename}`)
        } catch(err) {
            console.log("에러입니다. 휴먼.")
        }
    }

    return (
        <section className={style.cont_profileSetting}>
            <h1 className={style.tit_profileSetting}>
                프로필 설정
            </h1>

            <p className={style.txt_profileSetting}>
                나중에 언제든지 변경할 수 있습니다.
            </p>

            <div className={style.cont_profileImg}>
                <img src={그림} className={style.img_profileImg}></img>
                
                <input type="file" 
                className={style.inp_file} 
                ref={inputRef}
                accept="image/*" 
                onChange={changeTest}/>

                <div className={style.div_uploadImg} 
                style={{backgroundImage: `url(${uploadImg})`}} 
                onClick={clickTest}>
                    {/* <img src={uploadImg} className={style.img_uploadImg}></img> */}
                </div>
            </div>


            <form className={style.form_profileSetting}>
                <label 
                htmlFor='usernameInput' 
                className={style.label_profileSetting}>
                사용자 이름
                </label>

                <input 
                type="text" 
                id="usernameInput"
                className={style.input_profileSetting} 
                placeholder="2~10자 이내여야 합니다.">
                </input>

                <label 
                htmlFor='accountInput' 
                className={style.label_profileSetting}>
                계정 ID
                </label>

                <input 
                type="text" 
                id="accountInput"
                className={style.input_profileSetting} 
                placeholder="영문, 숫자, 특수문자(.).(_)만 사용 가능합니다.">
                </input>

                <label 
                htmlFor='introInput' 
                className={style.label_profileSetting}>
                소개
                </label>

                <input 
                type="text" 
                id="introInput"
                className={style.input_profileSetting} 
                placeholder="자신과 판매할 상품에 대해 소개해 주세요!">
                </input>

                <button 
                className={style.btn_profileSetting}>
                감귤마켓 시작하기
                </button>

            </form>
        </section>
    )
}
