import React, { useState, useEffect } from "react";
import axios from "axios";

import BaseURL from "../../components/common/BaseURL";
import style from "./product.module.css";

export default function Product({ accountname, profileType }) {

    // 가짜 데이터
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTk2MjYwMTdhZTY2NjU4MWM1ZDA4NCIsImV4cCI6MTY3NjY4NzI5MywiaWF0IjoxNjcxNTAzMjkzfQ.nI5e_IgdnZmTHnLcBKvttP8w3AFQ2rnR6NMxAzdTF40"
    // 가짜 데이터

    const [productList, setProductList] = useState([]);

    const getProductList = async () => {
        const url = BaseURL + `/product/${accountname}`;

        try {
            const productRes = axios.get(url, {
                "headers": {
                    "Authorization": `Bearer ${token}`,  
                    "Content-type": "application/json",
                }
            })
            const result = await productRes;
            setProductList(result.data.product);
        } catch(err) {
            console.error(err);
        }
    }
    
    useEffect(()=>{
        getProductList();
    }, [])

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
                                    <li key={id}>
                                        <figure>
                                            <img src={product.itemImage} className={style.img_product} alt="" />
                                            <figcaption>{product.itemName}</figcaption>
                                        </figure>
                                        <strong className={style.strong_product_price}>{product.price}</strong>
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
