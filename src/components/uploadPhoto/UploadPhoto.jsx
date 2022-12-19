
import {React, useState} from 'react'
import RemoveImg from "../../assets/imgs/x.png";
import style from "./uploadPhoto.module.css";


export default function UploadPhoto({imageFileList, onRemove}) {

    return (
        <div>  
            {/* {fileImage && ( <img alt="sample" src={fileImage} */}
            {/* style={{ margin: "auto" }} /> )} */}
            <div className={style.wrap_img}>
                {imageFileList.map((x, i) => (
                    <div  className={style.cont_img} id= {`i${i}`}>
                        <img
                            alt=""
                            key={i}
                            src={x}
                            className={style.img_preview}
                        />
                        <img id= {i} className={style.btn_remove} src={RemoveImg} alt="삭제버튼" onClick={onRemove}/>
                    </div>
                    ))}
            </div>
        </div>
    )
}
