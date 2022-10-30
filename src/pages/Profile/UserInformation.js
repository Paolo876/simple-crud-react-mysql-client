import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { IKImage } from 'imagekitio-react';
import defaultAvatar from "../../assets/default-profile.png";
import { useAuthContext } from '../../hooks/useAuthContext';
import CircleIcon from '@mui/icons-material/Circle';
import getUserStatus from '../../utils/getUserStatus';
import axios from 'axios';
import { domain } from '../../variables';
//media
import SettingsIcon from '@mui/icons-material/Settings';
import "./UserInformation.scss";
import FriendResponseActions from './FriendResponseActions';
import { useFriendsContext } from '../../hooks/useFriendsContext';

export default function UserInformation({ userData, postsLength, friendsList, isOwnProfile }) {
    const { id: userId } = useAuthContext().user;
    const { friendsList: _friendsList } = useFriendsContext();
    const navigate = useNavigate();
    const { username, userInformation, id } = userData;
    const [ userRelationship, setUserRelationship ] = useState(null);
    const [ friendStatus, setFriendStatus ] = useState(null);
    useEffect(() => {
        if(!isOwnProfile){
            const loggedInUser = friendsList.find(item => item.id === userId)
            if(loggedInUser){
                setUserRelationship(loggedInUser.relationship.status)
            } else {
                setUserRelationship("no-relationship")
            }
        } else {
            setUserRelationship("user-profile")
        }
    }, [userData])

    useEffect(() => {
        if(userRelationship === "friends"){
            const { isLoggedIn, userStatus } = _friendsList.find(item => item.id === id);
            setFriendStatus({isLoggedIn, userStatus})
        }
    }, [userRelationship, _friendsList])
  return (
    <div className='profile-page-user-information'>
        <div className="about-user">
            <div className="profile-picture">
                {userInformation.imageData ? 
                    <IKImage 
                    // className={`${getUserStatus(isLoggedIn, userStatus)}`}
                    src={userInformation.imageData.photoURL} alt="user avatar"
                    urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                    transformation={[{
                    height: 100,
                    width: 100
                    }]}
                    /> : 
                    <img src={defaultAvatar} alt="user avatar"/>
                }
            </div>
            <div className="username-container">
                <p>{username}</p>
                <p>{userInformation.firstName} {userInformation.lastName}</p>
                {userRelationship === "friends" && friendStatus &&
                    <div className="status-container">
                        <p>{getUserStatus(friendStatus.isLoggedIn, friendStatus.userStatus) === "invisible" ? "offline" : getUserStatus(friendStatus.isLoggedIn, friendStatus.userStatus)}</p>
                        <div className={`icon ${getUserStatus(friendStatus.isLoggedIn, friendStatus.userStatus)}`}>
                        <CircleIcon />
                        </div>
                    </div>
                }
            </div>

            <div className="profile-actions">
                {isOwnProfile
                ? 
                    <button onClick={() => navigate("/settings")} className="edit-btn">Edit Profile <SettingsIcon/></button>
                :
                    <FriendResponseActions userRelationship={userRelationship} setUserRelationship={setUserRelationship} id={userData.id}/>
                }
            </div>
        </div>
        <div className="user-content">
            <p className='posts'><span>{postsLength}</span> posts</p>
            <p className='friends'><span>{friendsList.filter(item => item.relationship.status === "friends").length}</span> friends</p>
        </div>
    </div>
  )
}
