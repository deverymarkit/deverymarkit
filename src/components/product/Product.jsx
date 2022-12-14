import React from "react";

import productStyle from "./product.module.css";

export default function Product() {
    return (
        <section className={productStyle.wrap_product}>
            <div className={productStyle.cont_product}>
                <h2>판매 중인 상품</h2>
                <ol className={productStyle.ol_product_list}>
                    {
                        [1,2,3].map(data => 
                            <li>
                                <figure>
                                    <img src=""  className={productStyle.img_product} alt="상품명" />
                                    <figcaption>상품명</figcaption>
                                </figure>
                                <strong className={productStyle.strong_product_price}>35,000원</strong>
                            </li>
                        )
                    }
                </ol>
            </div>
        </section>
    )
}
