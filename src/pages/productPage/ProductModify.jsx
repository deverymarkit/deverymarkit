import React, { useRef, useState, useEffect } from "react";
import style from "./productModify.module.css";
import uploadImg from "../../assets/imgs/upload-img.png";
import defalutImg from "../../assets/imgs/product-none.png";
import axios from "axios";
import Header from "../../components/common/header/Header.jsx";
import { useParams, useNavigate } from "react-router-dom";
import BaseURL from "../../components/common/BaseURL";
import BASE_URL from "../../components/common/BaseURL";

export default function ProductModify() {
    const [productImg, setProductImg] = useState(defalutImg);
    const [nameWarning, setNameWarning] = useState("");
    const [priceWarning, setPriceWarning] = useState("");
    const [urlWarning, setUrlWarning] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productUrl, setProductUrl] = useState("");
    const inputRef = useRef();
    const { productId } = useParams();
    const [userToken, setUserToken] = useState("");
    const regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    const navigate = useNavigate();
    
    useEffect(() => {
        const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
        const userToken = loginInfo.token;
        setUserToken(userToken);
    }, []);
    
    useEffect(() => {

        if (productId) {
            const url = BaseURL + `/product/detail/${productId}`;
            
            const getUserProduct = async function () {
            try {
                const productRes = await axios.get(
                    url,
                {
                    "headers": {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-type": "application/json",
                },
                },
            );
                setProductImg(productRes.data.product.itemImage);
                setProductName(productRes.data.product.itemName);
                setProductPrice(productRes.data.product.price);
                setProductUrl(productRes.data.product.link);
            } catch (error) {
                console.log(error);
            }
            };
            getUserProduct();
        }
    }, [productId, userToken]);
    

    const handleCheckInput = (event) => {
        // Input을 체크해서 state를 변경하는 함수.
        if (event.target.name === "productName") setProductName(event.target.value); 
        else if (event.target.name === "productPrice") setProductPrice(event.target.value);
        else if (event.target.name === "productUrl") setProductUrl(event.target.value);
        
    }

    useEffect(() => {
        // 유효성검사를 체크하는 useEffect

        if (productName.length >= 2 && productName.length <= 15) setNameWarning("")
        if (productPrice >= 1 ) setUrlWarning("")
        if (regex.test(productUrl) ) setUrlWarning("")
    }, [productName, productPrice, productUrl])

    const handleSetProduct = (e) => {
        // const 정규표현식 = /^[_A-Za-z0-9+]*$/;
        e.preventDefault();
        if (productName.length < 2 || productName.length > 15) {
            setNameWarning("2~15자 이내여야 합니다.");
            return
        }
        if (productPrice < 1) {
            setPriceWarning("1원 이상이어야 합니다.");
            return
        }  
        if (!regex.test(productUrl)) {
            setUrlWarning("올바른 Url 형식이 아닙니다.");
            return
        }

        const productData = {
            "itemName": productName,
            "price": +productPrice,
            "link": productUrl,
            "itemImage": productImg
        }
        console.log(productImg);
        saveData(productData);
    }

    // axios
    const saveData = async (productData) => {
if(productId){
    const url = BaseURL + `/product/${productId}`;

    try {
        const productRes = await axios.put(url, { 
            "product": {
                ...productData
            }},{
            "headers": {
                "Authorization" : `Bearer ${userToken}`,
                "Content-type" : "application/json"
            }}
            
        ,)
        navigate(-1);
        const productUpdata = (await productRes).data
        // console.log(productUpdata);
    } catch(err) { 
        const error = err.response.data
        setUrlWarning(error.message);
    }
    
}
else{
    const url = BaseURL + `/product`;

    try {
        const productRes = await axios.post(url, { 
            "product": {
                ...productData
            }},{
            "headers": {
                "Authorization" : `Bearer ${userToken}`,
                "Content-type" : "application/json"
            }}
            
        ,)
        navigate(-1);     
        const productUpdata = (await productRes).data
        // console.log(productUpdata);


    } catch(err) { 
        const error = err.response.data
        setUrlWarning(error.message);
    }

}
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
        const url = BaseURL + `/image/uploadfile`;
        const formData = new FormData();
        formData.append('image', image);
        try {
            const imgRes = axios.post( url, formData,
            {
                "headers": {
                    "Content-Type": "multipart/form-data"
                }
            })
            const imgUrl = (await imgRes).data.filename;
            setProductImg(BASE_URL + `/${imgUrl}`)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <Header type = "modification" handleHeaderBtn={handleSetProduct}/>
            <section className={style.cont_productModify}>

                <div className={`${style.cont_Img} ${style.product}`}>
                    <img src={productImg} className={`${style.img_modification} ${style.product}`} alt="상품 사진"></img>
                    <input type="file" 
                    className={style.inp_file} 
                    ref={inputRef}
                    accept="image/*" 
                    onChange={handleGetImgUrl}/>
                    <img className={style.img_uploadImg} src={uploadImg} alt="" onClick={handleInputRef}/>
                
                    
                </div>


                <form className={style.form_productModify}>
                    <label 
                    htmlFor='productName' 
                    className={style.label_productModify}
                    >
                    상품명
                    </label>

                    <input 
                    type="text" 
                    id="productName"
                    name="productName"
                    className={style.input_productModify} 
                    placeholder="2~15자 이내여야 합니다."
                    value={productName}
                    onChange={handleCheckInput}>
                    </input>
                    <p className={style.p_warning}>{nameWarning}</p>

                    <label 
                    htmlFor='productPrice' 
                    className={style.label_productModify}>
                    가격
                    </label>

                    <input 
                    type="number" 
                    id="productPrice"
                    name="productPrice"
                    className={style.input_productModify}
                    placeholder="숫자만 입력 가능합니다."
                    value={productPrice}
                    onChange={handleCheckInput}>
                    </input>
                    <p className={style.p_warning}>{priceWarning}</p>

                    <label 
                    htmlFor='productUrl' 
                    className={style.label_productModify}>
                    판매 링크
                    </label>

                    <input 
                    type="text" 
                    id="productUrl"
                    name="productUrl"
                    className={style.input_productModify} 
                    placeholder="URL을 입력해 주세요."
                    value={productUrl}
                    onChange={handleCheckInput}>
                    </input>
                    <p className={style.p_warning}>{urlWarning}</p>

                
                </form>
            </section>
        </>
    )
}