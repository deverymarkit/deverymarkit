import React, { useState, useEffect } from 'react'


export default function useCustomTopBtn() {
const [showButton, setShowButton] = useState(false);
// 스크롤을 최상단으로 올리는 이벤트
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

useEffect(() => {
    const handleShowButton = () => {
        if (window.scrollY > 300) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }

    window.addEventListener("scroll", handleShowButton)
    return () => {
        window.removeEventListener("scroll", handleShowButton)
    }
}, [])

    return [showButton, scrollToTop]
}
