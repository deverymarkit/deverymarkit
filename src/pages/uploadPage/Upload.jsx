import { React, useState, useRef } from "react";
import BasicProfileImg from "../../components/common/BasicProfileImg";
import style from "./upload.module.css";
import UploadImg from "../../assets/imgs/upload-img.png";
import UploadPhoto from "../../components/uploadPhoto/UploadPhoto";
import Header from "../../components/common/header/Header";

export default function Upload() {
    const [imageFileList, setImageFileList] = useState([]);
    const textarea = useRef();

    const handleResizeHeight = () => {
        textarea.current.style.height = "auto";
        textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    };

    const onRemove = (e) =>{
        // URL.revokeObjectURL(imageFileList[e.target.id]);
        setImageFileList(imageFileList.filter(x => x !== imageFileList[e.target.id]));
    };

    const handleSaveBtn = (e) =>{
        console.log("hi");
    };

    const storeImage = ({ target }) => {
        // file 을 "image" 변수에 저장. 이 때 image는 Array!
    const image = target.files;
    if (image.length === 0) {
        let imageList = [...imageFileList];
        setImageFileList(imageList);
    } else if(image.length <= 3){
        // 기존 imageFileList에 저장된 값을 "imageList"에 저장.
        let imageList = [];
        // imgae 배열의 길이만큼 for문을 돌려주고 배열에 요소를 imageList에 push해준다.
        for (let i = 0; i < image.length; i++) {
            imageList.push(URL.createObjectURL(image[i]));
        }
        // 이렇게 만들어진 imageList 배열을 set!
            setImageFileList(imageList);
        } else{
            alert("사진은 3개 이하로 업로드가능합니다.");
        }
    };
    return (
        <>
                <Header type="upload" handleHeaderBtn = {handleSaveBtn}/>
                <div className={style.wrap_upload}>
                    <div className={style.cont_content}>
                        <BasicProfileImg />
                        <textarea
                            className={style.text_upload}
                            type="text"
                            placeholder="게시글 입력하기..."
                            onChange={handleResizeHeight}
                            ref={textarea}
                            required
                        />
                    </div>
                    {imageFileList? <UploadPhoto imageFileList={imageFileList} onRemove={onRemove}/>:""}
                    {/* <div className={style.cont_img}>
                        {imageFileList.map((x, i) => (
                            <img
                                alt=""
                                key={i}
                                src={x}
                                className={style.img_preview}
                            />
                        ))}
                    </div> */}
                    <input
                        className="ir"
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={storeImage}
                        id="input-file"
                        value=""
                        multiple
                    />
                <label htmlFor="input-file">
                    <img
                        className={style.btn_upload}
                        src={UploadImg}
                        alt="업로드 버튼"
                    />
                </label>
            </div>
        </>
    );
}
