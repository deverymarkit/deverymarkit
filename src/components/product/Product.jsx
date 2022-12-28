import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { customAuthAxios } from "../../api/customAxios";
import style from "./product.module.css";

export default function Product({ accountname }) {
    
    const navigate = useNavigate();

    const [productList, setProductList] = useState([]);

    const getProductList = async () => {
        try {
            const productRes = await customAuthAxios.get(`/product/${accountname}`)
            setProductList(productRes.data.product);
        } catch(err) {
            console.error(err);
        }
    }
    
    useEffect(()=>{
        getProductList();
    }, [accountname])

    //상품등록버튼 클릭 이벤트
    const handleProductDetail = (e) => {
    navigate(`/productmodify/${e.target.name}`)
    }
    
    return (
        <>
            {
                productList.length > 0 ? (
                    <section className={style.wrap_product}>
                    
                    <div className={style.cont_product}>
                        <h2>판매 중인 상품</h2>
                        <ol className={style.ol_product_list}>
                            {
                                // 내 프로필이면 모달, 남의 프로필이면 판매링크 넣기
                                // 가격 단위 콤마 넣기
                                productList.map((product, id) => 
                                    <li key={id} name={product.id} onClick={handleProductDetail}>
                                        <figure>
                                            <img name={product.id} src={product.itemImage} className={style.img_product} alt="" />
                                            <figcaption>{product.itemName}</figcaption>
                                        </figure>
                                        <strong className={style.strong_product_price}>{product.price.toLocaleString()}</strong>
                                    </li>
                                )
                            }
                        </ol>
                    </div>
                </section>
                ) : null
            }
        </>
    )
}
