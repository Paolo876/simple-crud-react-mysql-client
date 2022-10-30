import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { domain } from '../../../../variables';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useFriendsContext } from "../../../../hooks/useFriendsContext";
import { IKImage } from 'imagekitio-react';
import defaultAvatar from "../../../../assets/default-profile.png";
import getUserStatus from '../../../../utils/getUserStatus';

import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleIcon from '@mui/icons-material/Circle';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./PrivateChatRoom.scss";

export default function PrivateChatRoom({members}) {
  const navigate = useNavigate();
  const { id } = useAuthContext().user;
  const { friendsList } = useFriendsContext();
  const { username, userInformation, id: memberId } = members.find(item => item.id !== id);
  const { firstName, lastName, imageData } = JSON.parse(userInformation);
  const [ member, setMember ] = useState(null)
  useEffect(() => {
    axios.get(`${domain}/friends/status/${memberId}`, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
    }).then(res => {
      setMember(res.data)
      //if friends check friends context for user status etc...
      if(res.data && res.data.status === "friends"){
        setMember(friendsList.find(item => item.id === memberId))
      } else {
        //temporary*** update later
        setMember(() => {
          const item = { ...members.find(item => item.id !== id) }
          if (res.data && res.data.status) {
            item.relationship = {status: res.data.status}
          } else {
            item.relationship = {status: null}
          }
          return item
        })   
      }
    })
  }, [members])
  // if( member ) console.log(getUserStatus(member.isLoggedIn, member.userStatus))
  return (
    <div className='private-chat-room'>
      {member && <>
        <div className="user-info">
            <div className="image-container">
            {imageData ? 
              <IKImage 
                src={imageData.photoURL} alt="user avatar"
                urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                transformation={[{
                height: 100,
                width: 100
              }]}
              /> : 
              <img src={defaultAvatar} alt="user avatar"/>
            }
            </div>
            <button type='button' onClick={() => navigate(`/profile/${memberId}`)}>{username}</button>
            <p>{firstName} {lastName}</p>
        </div>
        <div className="status">
          <h5>Status: </h5>
          {member.relationship.status === "friends" ? 
            <div className="status-container">
              <p>{getUserStatus(member.isLoggedIn, member.userStatus) === "invisible" ? "offline" : getUserStatus(member.isLoggedIn, member.userStatus)}</p>
              <div className={`icon ${getUserStatus(member.isLoggedIn, member.userStatus)}`}>
                <CircleIcon />
              </div>
            </div>
          : 
            <div className="status-container"><p className='not-friends'>N/A <small>(Must be friends with the user.)</small></p></div>
          }

        </div>
        <div className="member-relationship">
          <h5>User Relationship: </h5>
          {member.relationship.status === "friends" && <p><PeopleOutlineIcon/> Friends</p>}
          {member.relationship.status === "pending" && <p><PersonOutlineIcon/>Sent you a friend request</p>}
          {member.relationship.status === "awaiting-response" && <p><PersonOutlineIcon/> Friend request sent.</p>}
          {member.relationship.status === null && <p className='not-friends'>You are not friends with this user.</p>}
        </div>
        <div className="actions">
          <button onClick={() => navigate(`/profile/${memberId}`)}><AccountCircleIcon/><p>Profile</p></button>
          <button onClick={() => console.log("**to add soon.")}><PersonOffIcon/><p>Block User</p></button>
          <button onClick={() => console.log("**to add soon.")}><DeleteOutlineIcon/><p>Delete Conversation</p></button>
        </div>
      </>}
    </div>
  )
}
