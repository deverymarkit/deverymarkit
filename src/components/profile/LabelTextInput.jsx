import React from "react"
import style from "./labelTextInput.module.css"

export default function LabelTextInput({inputname, labelname, placeholder, handleInput, inputValue}) {
  return (
    <>
    <label 
    htmlFor={inputname} 
    className={style.label_profileSetting}>
    {labelname}
    </label>

    <input 
        type="text" 
        id={inputname}
        name={inputname}
        className={style.input_profileSetting} 
        placeholder={placeholder}
        onChange={handleInput}
        value={inputValue}>
    </input> 
    </>
  )
}
