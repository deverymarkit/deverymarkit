import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customAuthAxios } from "../../api/customAxios";
import ModalPortal from "../common/modal/ModalPortal";
import Modal from "../common/modal/Modal";
import MessageModal from "../common/modal/MessageModal";
import style from "./product.module.css";

export default function Product({ accountname }) {
    
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [productChoice, setProductChoice ] = useState("");
    const [productUrl, setProductUrl ] = useState("");

// 모달 관리 변수
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSecondOpen, setModalSecondOpen] = useState(false);

    const getProductList = async () => {
        try {
            const productRes = await customAuthAxios.get(`/product/${accountname}`)
            setProductList(productRes.data.product);
        } catch(err) {
            console.error(err);
        }
    }
    
    useEffect(()=>{
        //계정변경시 업데이트
        getProductList();
    }, [accountname])

    useEffect(()=>{
        //삭제모달 후 돌아왔을때 리스트 업데이트 
        if(!modalSecondOpen){
            getProductList();
        }
    }, [modalSecondOpen])

    // 모달창 노출
    const showModal = (e) => {
        setModalOpen(true);
        setProductChoice(e.currentTarget.id)
        setProductUrl(e.currentTarget.dataset.link)
        console.log(e.currentTarget.dataset.link)
    };

    const handleProductDetail = (event) => {
        // Input을 체크해서 state를 변경하는 함수.
        if (event.target.name === "수정") navigate(`/productmodify/${productChoice}`);
        else if (event.target.name === "삭제") {
            setModalSecondOpen(true);
            setModalOpen(false);
            }
        else if (event.target.name === "웹사이트에서 보기"){
            console.log(productUrl);
        } 
    }
    // 상품 삭제 이벤트
    const handleProductDelete = async () => {
            try {
                const productDeleteRes = await customAuthAxios.delete(`/product/${productChoice}`);
                setModalSecondOpen(false);
            } catch (err) {
                console.error(err);
            }
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
                                    <li key={id} data-link={product.link} id={product.id} onClick={showModal}>
                                        <figure>
                                            <img src={product.itemImage} className={style.img_product} alt="" />
                                            <figcaption>{product.itemName}</figcaption>
                                        </figure>
                                        <strong className={style.strong_product_price}>{product.price.toLocaleString()}</strong>
                                    </li>
                                )
                            }
                        </ol>
                    </div>
                    <ModalPortal>
                {modalOpen && 
                    <Modal  type="product" 
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen} 
                            handleHeaderBtn={showModal}
                            handleModal={handleProductDetail} />}    
                {modalSecondOpen &&
                    <MessageModal  
                            type="product" 
                            modalOpen={modalSecondOpen}
                            setModalOpen={setModalSecondOpen} 
                            handleHeaderBtn={showModal}
                            handleModal={handleProductDelete} />} 
            </ModalPortal>    
                </section>
                ) : null
            }
        </>
    )
}
