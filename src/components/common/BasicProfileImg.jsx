import React from 'react'
import basicImg from '../../assets/imgs/img-button.png';
import styles from './basicProfileImg.module.css'

export default function BasicProfileImg({type}) {
    return (
        type === "postlist" ? <img className= {styles.img_basic}  src={basicImg} alt="프로필 이미지" /> :
        <img src={basicImg} alt="프로필 이미지" />
    )
}
