import React, { useState, useEffect } from 'react';
import { IKContext, IKUpload } from "imagekitio-react";
import { domain } from '../../../variables';
import { useAuthContext } from '../../../hooks/useAuthContext';
import ImageIcon from '@mui/icons-material/Image';
// import "./ChatBoxInput.scss";

export default function AddImageButton({ imageData, setImageData, setIsImageLoading }) {
    const { user } = useAuthContext();
    const [ error, setError ] = useState(null);
    
    useEffect(() => {
        if(imageData) setIsImageLoading(false)
      },[imageData]);

    const authenticationEndpoint = `${domain}/imagekit`;
    const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
    const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;
    
  return (
    <button className='file-upload-btn' type="button">
        <IKContext 
            publicKey={publicKey} 
            urlEndpoint={urlEndpoint} 
            authenticationEndpoint={authenticationEndpoint} 
        >
        <label>
            <IKUpload
                    fileName={`chat_${user.id}.png`}
                    useUniqueFileName={true}
                    onError={(err) => setError(err)}
                    folder={`/simple-crud-react-mysql/chat-images`}
                    onSuccess={data => setImageData({fileId: data.fileId, name: data.name, photoURL: data.url})}
                    onChange={() => setIsImageLoading(true)}
                />
        </label>
        <ImageIcon/>

        </IKContext>

    </button>
  )
}
