import React from 'react';
import "./Input.scss";
export default function Input({ onChange, onKeyDown, value, label, type, height, maxLength, placeholder, required=false, disabled=false}) {

  return (
    <label className='input-item'>
        <span>{label}</span>
        {type === "text" && 
          <input 
            type={type} 
            onChange={onChange} 
            value={value} 
            onKeyDown={onKeyDown} 
            placeholder={placeholder} 
            maxLength={maxLength} 
            required={required}
            disabled={disabled}
          />}
        {type === "textarea" && 
          <textarea 
            style={{height: `${height}` }} 
            maxLength={maxLength} 
            onChange={onChange} 
            value={value}
            onKeyDown={onKeyDown} 
            placeholder={placeholder} 

          ></textarea>}
    </label>
  )
}
