import React, { useState } from 'react'
import { IKImage } from 'imagekitio-react';
import { formatDistanceToNow } from 'date-fns';
import defaultAvatar from "../../assets/default-profile.png";
import Modal from '../../components/Modal/Modal';
import "./ChatMessageItem.scss";

export default function ChatMessageItem({data}) {
  const parsedInformation = data.User.userInformation && JSON.parse(data.User.userInformation);
  const [ showModal, setShowModal ] = useState(false);
  return (
    <li className='chat-message-item'>
        <div className="image-container">
            {parsedInformation.imageData ? 
                <IKImage 
                    src={parsedInformation.imageData.photoURL} alt="user avatar"
                    urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                    transformation={[{ height: 35, width: 35 }]}
                /> : 
                <img src={defaultAvatar} alt="user avatar"/>
            }
        </div>
        <div className='message-container'>
            <p className='user'>{data.User.username} <small>{formatDistanceToNow(Date.parse(data.updatedAt))}</small></p>
            <p className='message'>{data.message}</p>
            {data.media && 
                <button className='media' onClick={() => setShowModal(true)}>
                    <IKImage 
                            src={data.media} alt="message image"
                            urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                            transformation={[{ quality: 10 }]}
                        />
                </button>
            }
        </div>
        {showModal && <Modal onHide={() => setShowModal(false)}><ImageModal src={data.media}/></Modal>}
    </li>
  )
}


const ImageModal = ({ src }) => <div className='chat-image-modal'>
        <IKImage 
            src={src} alt="message image"
            urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
        />
    </div>;