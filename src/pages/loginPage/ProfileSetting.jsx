import React from "react"
import style from "./profileSetting.module.css"
import profileImg from "../../assets/imgs/profile_none.png"
import uploadImg from "../../assets/imgs/upload-img.png"

export default function ProfileSetting() {
    return (
        <section className={style.cont_profileSetting}>
            <h1 className={style.tit_profileSetting}>
                프로필 설정
            </h1>

            <p className={style.txt_profileSetting}>
                나중에 언제든지 변경할 수 있습니다.
            </p>

            <div className={style.cont_profileImg}>
                <img src={profileImg} className={style.img_profileImg}></img>
                <div className={style.div_uploadImg} style={{backgroundImage: `url(${uploadImg})`}} >
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
