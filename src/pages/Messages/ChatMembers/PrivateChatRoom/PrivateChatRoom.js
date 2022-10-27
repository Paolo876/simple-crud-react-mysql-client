import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { domain } from '../../../../variables';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useFriendsContext } from "../../../../hooks/useFriendsContext";
import { IKImage } from 'imagekitio-react';
import defaultAvatar from "../../../../assets/default-profile.png";
import getUserStatus from '../../../../utils/getUserStatus';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
      // console.log(res.data)
      //if friends check friends context for user status etc...
      if(res.data && res.data.status === "friends"){
        setMember(friendsList.find(item => item.id === memberId))
      } else {
        // create a listener to check the user's online status, etc...
        // console.log("not friends")

        //temporary*** update later
        setMember(() => {
          const item = { ...members.find(item => item.id !== id) }
          item.relationship = {status: null}
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
            <div className={`image-container ${getUserStatus(member.isLoggedIn, member.userStatus)}`}>
            {imageData ? 
              <IKImage 
                src={imageData.photoURL} alt="user avatar"
                urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                transformation={[{
                height: 80,
                width: 80
              }]}
              /> : 
              <img src={defaultAvatar} alt="user avatar"/>
            }
            </div>
            <p>{username}</p>
            <p>{firstName} {lastName}</p>
        </div>
        <div className="member-relationship">
          {member.relationship.status === "friends" && <p><PeopleOutlineIcon/> You are friends with this user.</p>}
          {member.relationship.status === "pending" && <p><PersonOutlineIcon/>This user sent you a friend request.</p>}
          {member.relationship.status === "awaiting-response" && <p><PersonOutlineIcon/> Friend request sent to this user.</p>}
          {member.relationship.status === null && <p><PersonAddAltIcon/> Send Friend Request.</p>}
        </div>
        <div className="actions">
          <button onClick={() => navigate(`/profile/${memberId}`)}><AccountCircleIcon/><p>Profile</p></button>
          {/* <button>Mute Notifications</button> */}
        </div>
      </>}
    </div>
  )
}
