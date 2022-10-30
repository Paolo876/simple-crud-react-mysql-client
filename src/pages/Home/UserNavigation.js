import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { IKImage } from 'imagekitio-react';
import axios from 'axios';
import { domain, usersSocket } from '../../variables';
//media
import defaultAvatar from "../../assets/default-profile.png";
import "./UserNavigation.scss";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircleIcon from '@mui/icons-material/Circle';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FriendsList from './FriendsList';
import FriendRequestsList from './FriendRequestsList';

export default function UserNavigation() {
  const { user, userStatus } = useAuthContext();
  // const [ status, setStatus ] = useState('invisible');
  const [ showSelector, setShowSelector ] = useState(false);
  // const [ newFriendRequest, setNewFriendRequest] = useState(null);
  useEffect(() => {
    // //get current status of user  (move to userAuth)
    // axios.get(`${domain}/auth/status/`, {
    //   headers: {
    //     accessToken: sessionStorage.getItem("accessToken")
    //   }
    // }).then( res => {
    //   setStatus(res.data.userStatus)
    // })

    //listen to new friend requests (socketio)
    // usersSocket.on("newRequest", data => setNewFriendRequest(data))
  }, [])

  //handle user status change (move to userAuth)
  const changeUserStatus = (_status) => {
    usersSocket.emit("statusChange", {id: user.id, userStatus: _status})
    setShowSelector(false)
    // axios.put(`${domain}/user-updates/user-status`, {userStatus: _status}, {
    //     headers: {
    //       accessToken: sessionStorage.getItem("accessToken")
    //     },
    //   }).then( res => setStatus(res.data.userStatus) )
  }
  return (
    <div className='user-navigation'>
        {showSelector && <div className="backdrop" onClick={() => setShowSelector(false)}></div>}
        <button className="user-info item">
            <div className={`user-avatar ${userStatus}`}>
                {user.userInformation.imageData ? 
                    <IKImage 
                    src={user.userInformation.imageData.photoURL} alt="user avatar"
                    urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                    transformation={[{
                    height: 40,
                    width: 40
                    }]}
                    /> : 
                    <img src={defaultAvatar} alt="user avatar"/>
                }
            </div>
            <div className="user-data">
                <p className='username'>{user.username}</p>
                <p className='name'>{user.userInformation.firstName} {user.userInformation.lastName}</p>
            </div>
        </button>
        <div className="status-select">
            <span onClick={() => setShowSelector(true)} className="status">Status: <p>{userStatus}</p> <KeyboardArrowDownIcon className={`${showSelector ? 'active' : ''}`}/></span>
            {showSelector && <ul>
                <li onClick={() => changeUserStatus("online")}><CircleIcon className='online'/> online</li>
                <li onClick={() => changeUserStatus("idle")}><NightsStayIcon className='idle'/> idle</li>
                <li onClick={() => changeUserStatus("invisible")}><VisibilityOffIcon className='invisible'/> invisible</li>
            </ul>}
        </div>
        <FriendRequestsList/>
        <FriendsList/>
    </div>
  )
}
