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
  const { user } = useAuthContext();
  const [ status, setStatus ] = useState('invisible');
  const [ showSelector, setShowSelector ] = useState(false);
  const [ friendsList, setFriendsList ] = useState(null);
  const [ newFriendRequest, setNewFriendRequest] = useState(null);

  useEffect(() => {
    //get current list of friends
    axios.get(`${domain}/friends/user-friends/${user.id}`).then( res => {
      setFriendsList(res.data)
    })
    //get current status of user 
    axios.get(`${domain}/auth/status/`, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
    }).then( res => {
      setStatus(res.data.userStatus)
    })

    //listen to new friend requests (socketio)
    usersSocket.on("newRequest", data => setNewFriendRequest(data))
  }, [])

  //run on new friend request
  useEffect(() => {
    if(newFriendRequest){
      let friend = newFriendRequest;
      if(newFriendRequest.action === "add"){
        friend.relationship = {status: 'pending'}
        setFriendsList(prevState => [...prevState, friend])
      }
      if(newFriendRequest.action === "cancel"){
        setFriendsList(prevState => prevState.filter(item => item.id !== friend.id))
      }
    }
  }, [newFriendRequest]);

  //handle user status change
  const changeUserStatus = (_status) => {
    setShowSelector(false)
    axios.put(`${domain}/user-updates/user-status`, {userStatus: _status}, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        },
      }).then( res => setStatus(res.data.userStatus) )
  }
  return (
    <div className='user-navigation'>
        {showSelector && <div className="backdrop" onClick={() => setShowSelector(false)}></div>}
        <button className="user-info item">
            <div className={`user-avatar ${status}`}>
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
            <span onClick={() => setShowSelector(true)} className="status">Status: <p>{status}</p> <KeyboardArrowDownIcon className={`${showSelector ? 'active' : ''}`}/></span>
            {showSelector && <ul>
                <li onClick={() => changeUserStatus("online")}><CircleIcon className='online'/> online</li>
                <li onClick={() => changeUserStatus("idle")}><NightsStayIcon className='idle'/> idle</li>
                <li onClick={() => changeUserStatus("invisible")}><VisibilityOffIcon className='invisible'/> invisible</li>
            </ul>}
        </div>
        {friendsList && <FriendRequestsList friendRequests={friendsList.filter(item => item.relationship.status ==="pending")} setFriendsList={setFriendsList}/>}
        {friendsList && <FriendsList friendsList={friendsList.filter(item => item.relationship.status ==="friends")}/>}
    </div>
  )
}
