import React, { useState, useEffect } from 'react';
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import defaultImage from "../../assets/default-profile.png";
import "./UploadImageForm.scss";
import axios from 'axios';
import { domain } from '../../variables';
export default function UploadImageForm({imageData, setImageData, imageLoading, setImageLoading}) {
  const [error, setError ] = useState(null);

  //trigger imageLoading state
  useEffect(() => {
    if(imageData) setImageLoading(false)
  },[imageData]);

  const authenticationEndpoint = `${domain}/imagekit`;
  const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

  const handleClick = async () => {
    setImageLoading(true)
    axios.delete(`${domain}/imagekit/delete/${imageData.fileId}`, {
      headers: { accessToken: sessionStorage.getItem("accessToken") }
    }).then(() => {
      setImageData(null)
      setImageLoading(false)
    })
  }

  return (
    <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint} >
      <form className='upload-image-form'>
        <label className='image-input'>
          <span>Profile Picture: <small>(optional)</small></span>
          <div className="image-preview">
              {imageData && <IKImage  src={imageData.photoURL}   
                                      transformation={[{ height: 300, width: 400 }]}
                                      loading="lazy"   
                                      lqip={{ active: true, quality: 20 }}
              />}
              {!imageData && <img src={defaultImage} alt='preview'/>}
          </div>
          {!imageData && <IKUpload
            fileName="avatar.png"
            useUniqueFileName={true}
            onError={(err) => setError(err)}
            folder={`/simple-crud-react-mysql/profile-images`}
            onSuccess={data => setImageData({fileId: data.fileId, name: data.name, photoURL: data.url})}
            onChange={() => setImageLoading(true)}
          />}
          {!imageData && !imageLoading && <div className='input-btn'>Choose File:</div>}
        </label>
        {imageLoading && <div className='load-btn'>Image loading, please wait...</div>}
        {imageData && !imageLoading && <div className='input-btn'>{imageData.name}<button className='close-btn' type="button" onClick={handleClick}>Remove</button></div>}
      </form>
    </IKContext>

  )
}
