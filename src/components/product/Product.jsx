import React, { useState, useEffect } from "react";

import { customAuthAxios } from "../../api/customAxios";
import style from "./product.module.css";

export default function Product({ accountname, profileType }) {

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
