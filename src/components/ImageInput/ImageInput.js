import React, { useState } from 'react'

export default function ImageInput({title, }) {
  const [imageData, setImageData ] = useState(null);
  const [image, setImage ] = useState(null);

  return (
    <label>
        <span>{title}</span>
        {imageData.length === 0 && <p>No file chosen.</p>}
        {imageData.length !== 0 && <p>{imageData.length} file(s) chosen.</p>}
        <input 
                type="file" 
                multiple 
                accept="image/*"    
                onChange={onChangePicture}
                required
            />
    </label>
  )
}
