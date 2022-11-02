import React from 'react'
import { IKImage } from "imagekitio-react";
import "./AddImageForm.scss";
import CloseIcon from '@mui/icons-material/Close';

export default function AddImageForm({imageData, handleRemoveImage}) {

  return (
    <div className='add-image-form'>
          <IKImage  src={imageData.photoURL}   
                    transformation={[{ height: 400, width: 'auto' }]}
                    loading="lazy"   
                    height="250"
                    
          />
          <button type="button" onClick={handleRemoveImage}><CloseIcon/></button>
    </div>
  )
}
