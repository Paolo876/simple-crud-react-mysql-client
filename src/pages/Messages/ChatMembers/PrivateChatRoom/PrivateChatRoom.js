import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { domain } from '../../../../variables';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useFriendsContext } from "../../../../hooks/useFriendsContext";
import { IKImage } from 'imagekitio-react';
import defaultAvatar from "../../../../assets/default-profile.png";
import getUserStatus from '../../../../utils/getUserStatus';

import "./PrivateChatRoom.scss";

export default function PrivateChatRoom({members}) {
  const { id } = useAuthContext().user;
  const { friendsList } = useFriendsContext();
  const { username, userInformation, id: friendId } = members.find(item => item.id !== id);
  const { firstName, lastName, imageData } = JSON.parse(userInformation);
  const [ member, setMember ] = useState(null)
  useEffect(() => {
    axios.get(`${domain}/friends/status/${friendId}`, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
    }).then(res => {
      //if friends check friends context for user status etc...
      if(res.data && res.data.status === "friends"){
        setMember(friendsList.find(item => item.id === friendId))
      } else {
        // create a listener to check the user's online status, etc...
        // console.log("not friends")
      }
    })
  }, [members])
  // if( member ) console.log(getUserStatus(member.isLoggedIn, member.userStatus))
  return (
    <div className='private-chat-room'>
      <div className="user-info">
          <div className="image-container">
          {imageData ? 
            <IKImage 
              src={imageData.photoURL} alt="user avatar"
              urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
              transformation={[{
              height: 40,
              width: 40
            }]}
            /> : 
            <img src={defaultAvatar} alt="user avatar"/>
          }
          </div>
          <p>{username}</p>
          <p>{firstName} {lastName}</p>
      </div>
      <div className="actions">
        <button>Profile</button>
        <button>Mute Notifications</button>
      </div>
    </div>
  )
}
