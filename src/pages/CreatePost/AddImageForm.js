import React from 'react'
import sampleImg from "../../assets/sample.png"
import "./AddImageForm.scss";

export default function AddImageForm() {
  return (
    <div className='image-preview'>
        <img src={sampleImg} alt="" />
    </div>
  )
}
