import React, { useState } from "react";
import Header from "../../components/common/header/Header";
import Modification from "../../components/common/modification/Modification";
import useCheckInput from "../../hooks/useCheckInput.jsx";
import axios from "axios";

export default function ProductModify() {
    const [username, accountname, linkname, handleCheckInput] = useCheckInput(""); //커스텀훅
    const [profileImg, setProfileImg] = useState("");
    const userData = {
        
				"itemName": username,
				"price": accountname,//1원 이상
				"link": linkname,
				"itemImage": profileImg
    }


    const 상품등록 = async (userData) => {

        if(userData && accountname && linkname && profileImg){
            const url = 'https://mandarin.api.weniv.co.kr/';
            try {
                const signUpRes = axios.post(`${url}user`, {
                    "user": {
                        ...userData
                    },
                    "headers": {
                        "Content-Type": "application/json"
                    }
                })
                const signUpdata = (await signUpRes).data
                console.log(signUpdata);
        
        
            } catch(err) { 
                const error = err.response.data
                // setAccountWarning(error.message);
            }
        }
}


    return (
        <>
            <Header type="modification" handleHeaderBtn={상품등록} />
            <span>이미지 등록</span>
            <Modification type="product" profileImg={profileImg} setProfileImg = {setProfileImg} username={username} accountname ={ accountname} handleCheckInput ={handleCheckInput}/>
        </>
    )
}