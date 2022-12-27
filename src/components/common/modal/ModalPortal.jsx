import React from 'react'
import reactDom from "react-dom";

export default function ModalPortal({ children }) {

    const el = document.getElementById("modal");
    return reactDom.createPortal(children, el);
};

