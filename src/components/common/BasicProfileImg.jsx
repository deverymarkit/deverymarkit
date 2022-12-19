import React from 'react'
import basicImg from '../../assets/imgs/profile_none.png';
import style from './basicProfileImg.module.css'

export default function BasicProfileImg({type}) {
    return (
        type === "post" ? <img className= {style.img_basic}  src={basicImg} alt="프로필 이미지" /> :
        <img src={basicImg} alt="프로필 이미지" />
    )
}