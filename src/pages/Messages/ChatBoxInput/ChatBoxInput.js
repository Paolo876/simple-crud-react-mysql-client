import React, { useState, useEffect, useRef } from 'react';
import Picker from 'emoji-picker-react';
import { IKImage } from 'imagekitio-react';
import axios from 'axios';
import { domain, chatSocket } from '../../../variables';
import Input from "../../../components/Input/Input";
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import AddImageButton from './AddImageButton';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import "./ChatBoxInput.scss";

export default function ChatBoxInput({ chatRoomId=null, setMessages }) {
  const inputRef = useRef(null);
  const [ input, setInput ] = useState('');
  const [ imageData, setImageData ] = useState(null);  
  const [ showPicker, setShowPicker ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isImageLoading, setIsImageLoading ] = useState(false);
  const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

  useEffect(() => {
    setInput('');
    setIsLoading(false);
    if(imageData) handleRemoveImageClick();
  }, [chatRoomId])
  
  const handleRemoveImageClick = (e) => {
    e.preventDefault();
    if(imageData){
      const temp = imageData;
      setImageData(null)
      setIsImageLoading(true)
      axios.delete(`${domain}/imagekit/delete/${temp.fileId}`, {
        headers: { accessToken: sessionStorage.getItem("accessToken") }
      }).then(() => {
        setIsImageLoading(false)
      })  
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(chatRoomId){
      if(input.trim().length !== 0 || imageData){
        //if image is added, include media url
        let media;
        if(imageData) media = imageData.photoURL;
        setIsLoading(true)
        axios.post(`${domain}/chat/send-message`, 
          { 
            message: input, 
            media,
            ChatRoomId: chatRoomId
          }, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
              }
          }).then(res => {
            setInput('')
            setImageData(null)
            setIsLoading(false)
            // setMessages(prevState => [res.data, ...prevState])       //<-- temporarily disabled to allow socketio to do the message updating
            //emit to socketio
            chatSocket.emit("send-message", res.data)
          })
      }
    }
     else {
      if(input.trim().length !== 0) {
        let media;
        if(imageData) media = imageData.photoURL;
        setMessages({message: input, media});
      };
    }
  }
  return (
    <form className='chat-box-input' onSubmit={handleSubmit}>
      <div className="message-actions">
        {/* CURRENTLY DISABLED EMOJI PICKER FOR PERFORMANCE REASON */}
        {/* {showPicker && 
          <div className="emoji-picker-container">
            <div className="backdrop" onClick={() => setShowPicker(false)}></div>
            <Picker 
              onEmojiClick={(e, object) => setInput(prevState => prevState + object.emoji)} 
              disableSkinTonePicker="true"
              disableSearchBar="true"
              groupVisibility={{recently_used: false}}
            />
          </div>
        }
        <button onClick={() => setShowPicker(true)}><SentimentSatisfiedAltIcon/></button> */}
        <AddImageButton imageData={imageData} setImageData={setImageData} setIsImageLoading={setIsImageLoading} />
      </div>
      <div className="input-container">
        {isImageLoading && <div className='loading-img'><LoadingSpinner/></div>}
        {imageData &&
          <div className="img-preview">
            <IKImage  
              src={imageData.photoURL}   
              transformation={[{ height: 300, width: 400 }]}
              loading="lazy"   
              lqip={{ active: true, quality: 20 }}
              urlEndpoint={urlEndpoint}
            />
            <button onClick={handleRemoveImageClick}><CloseIcon/></button>
          </div>
        }
        <Input 
          type="text"
          onChange={ e => setInput(e.target.value) }
          value={input}
          disabled={isLoading}
          autoFocus={true}
          />
      </div>
      <div className="submit-btn">
        {!isLoading && !isImageLoading && <button type="submit"><SendIcon/></button>}
        {(isLoading || isImageLoading) &&<button type="submit" disabled><SendIcon/></button>}
      </div>
      

    </form>
  )
}
