import React, { useState }  from "react"
import style from "./profileSetting.module.css"
import Modification from "../../components/common/modification/Modification.jsx"
import useCheckInput from "../../hooks/useCheckInput.jsx";

export default function ProfileSetting() {
    const [username, accountname, linkname, handleCheckInput] = useCheckInput(""); //커스텀훅
    const [profileImg, setProfileImg] = useState("");
    const userData = {
        
				"itemName": username,
				"price": accountname,//1원 이상
				"link": linkname,
				"itemImage": profileImg
    }


    return (
        <section className={style.cont_profileSetting}>
            <h1 className={style.tit_profileSetting}>프로필 설정</h1>
            <p className={style.txt_profileSetting}>나중에 언제든지 변경할 수 있습니다.</p>
            <Modification type="profile" mode="setting"profileImg={profileImg} setProfileImg = {setProfileImg} username={username} accountname ={ accountname} handleCheckInput ={handleCheckInput}/>
        </section>
    )
}