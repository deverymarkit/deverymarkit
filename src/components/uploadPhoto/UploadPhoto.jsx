
import React from "react";
import RemoveImg from "../../assets/imgs/x.png";
import style from "./uploadPhoto.module.css";


export default function UploadPhoto({ imageFileList, handleRemoveImg }) {
    return (
        <div>  
            {/* 민약 이미지 리스트를 전달받으면 맵으로 이미지 리스트를 가로 스크롤로 출력합니다. */}
            <div className={`${style.wrap_img} ${ imageFileList.length === 0 && style.scroll_img}`}>
                {imageFileList.map((x, i) => (
                    <div  className={style.cont_img} key= {`div${i+1}`}>
                        <img
                            alt={`${i+1}번째 이미지`}
                            key={i}
                            src={URL.createObjectURL(x)}
                            className={style.img_preview}
                        />
                        <img id= {i} className={style.btn_remove} src={RemoveImg} alt="삭제버튼" onClick={handleRemoveImg}/>
                    </div>
                    ))}
            </div>
        </div>
    )
}
