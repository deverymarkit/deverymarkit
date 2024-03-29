import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customAuthAxios } from "../../api/customAxios";
import ModalPortal from "../common/modal/ModalPortal";
import Modal from "../common/modal/Modal";
import MessageModal from "../common/modal/MessageModal";
import style from "./product.module.css";
import useCustomModal from "../../hooks/useCustomModal";

export default function Product({ accountname, profileType }) {

    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [productChoice, setProductChoice ] = useState("");
    const [productUrl, setProductUrl ] = useState("");

    const {modalOpen, modalSecondOpen, setModalOpen, setModalSecondOpen} = useCustomModal();

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

    useEffect(()=>{
        //스크롤 금지 
        if(modalOpen || modalSecondOpen){
            document.body.style.overflow ="hidden";
            document.body.style.paddingRight = "15px";
        }else{
            document.body.style.overflow ="";
            document.body.style.paddingRight = "";
        }
    }, [modalOpen, modalSecondOpen])

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
            window.open(productUrl, '_blank'); 
        } 
    }
    // 상품 삭제 이벤트
    const handleProductDelete = async () => {
            try {
                await customAuthAxios.delete(`/product/${productChoice}`);
                setModalSecondOpen(false);
            } catch (err) {
                console.error(err);
            }
    }

    const showLink = (e) => {
        window.open(e.currentTarget.dataset.link,"_blank");
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
                                productList.map((product, id) => 
                                    <li key={product.id} data-link={product.link} id={product.id} onClick={profileType === "my" ? showModal : showLink}>
                                        <figure>
                                            <img src={product.itemImage} className={style.img_product} alt="" />
                                            <figcaption>{product.itemName}</figcaption>
                                        </figure>
                                        <strong className={style.strong_product_price}>{product.price.toLocaleString()}원</strong>
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
                ) : <></>
            }
        </>
    )
}
