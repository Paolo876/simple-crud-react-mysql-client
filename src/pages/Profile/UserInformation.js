import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { IKImage } from 'imagekitio-react';
import defaultAvatar from "../../assets/default-profile.png";
import { useAuthContext } from '../../hooks/useAuthContext';
import getUserStatus from '../../utils/getUserStatus';
import axios from 'axios';
import { domain } from '../../variables';
//media
import SettingsIcon from '@mui/icons-material/Settings';
import "./UserInformation.scss";
import FriendResponseActions from './FriendResponseActions';

export default function UserInformation({ userData, postsLength }) {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { username, userInformation: userInformation_, id, isLoggedIn, userStatus, friendsOf } = userData;
    const userInformation = JSON.parse(userInformation_);
    const [ userRelationship, setUserRelationship ] = useState(null);

    //check if user sent request
    useEffect(() => {
        if(!userRelationship){
            axios.get(`${domain}/friends/status/${userData.id}`, {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken")
                  }
              }).then(res => {
                if(res.data && res.data.status === "pending") setUserRelationship("confirm")
              })
        }
    },[userRelationship])

    useEffect(() => {
        const _user = userData.friendsOf.find(item => item.id === user.id);
        if(_user){
            setUserRelationship(userData.friendsOf.find(item => item.id === user.id).relationship.status)
        }
    }, [userData])

    const addFriend = () => {
      axios.post(`${domain}/friends/add`, { id }, {
        headers: {
            accessToken: sessionStorage.getItem("accessToken")
          }
      }).then(res => {
        if(!res.data.error){
            setUserRelationship("pending")
        }
      })
    }

  return (
    <div className='profile-page-user-information'>
        <div className="about-user">
            <div className="profile-picture">
                {userInformation.imageData ? 
                    <IKImage 
                    className={getUserStatus(isLoggedIn, userStatus)}
                    src={userInformation.imageData.photoURL} alt="user avatar"
                    urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                    transformation={[{
                    height: 100,
                    width: 100
                    }]}
                    /> : 
                    <img src={defaultAvatar} alt="user avatar" className={getUserStatus(isLoggedIn, userStatus)}/>
                }
            </div>
            <div className="username-container">
                <p>{username}</p>
                <p>{userInformation.firstName} {userInformation.lastName}</p>
            </div>
            <div className="profile-actions">
                {user.id === id 
                ? 
                    <button onClick={() => navigate("/settings")} className="edit-btn">Edit Profile <SettingsIcon/></button>
                :
                    <FriendResponseActions userRelationship={userRelationship} setUserRelationship={setUserRelationship} id={userData.id}/>
                }

            </div>
        </div>
        <div className="user-content">
            <p className='posts'><span>{postsLength}</span> posts</p>
            <p className='friends'><span>{friendsOf.filter(item => item.relationship.status === "friends").length}</span> friends</p>
        </div>
    </div>
  )
}
