import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { domain } from '../../variables';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import UserInformation from './UserInformation';
import UserPosts from './UserPosts';
import PageContainer from "../../components/PageContainer/PageContainer";
import "./Profile.scss";
import { useFriendsContext } from '../../hooks/useFriendsContext';

export default function Profile() {
  const navigate = useNavigate();
  const { isProfileSetup, user } = useAuthContext();
  const { friendsList } = useFriendsContext();
  const { id } = useParams();
  const [ error, setError ] = useState(null);
  const [ userData, setUserData ] = useState(null);
  const [ postsLength, setPostsLength ] = useState(0);
  const [ friends, setFriends ] = useState([]);
  useEffect(()=> {
    if(!isProfileSetup) navigate("/profile-setup");
    if(parseInt(id) === parseInt(user.id)){
      setUserData(true)
    } else {
      axios.get(`${domain}/auth/profile/${id}`).then(res => {
        if(!res.data.error){
          const response = {id: res.data.id, username: res.data.username, userInformation: res.data.userInformation && JSON.parse(res.data.userInformation)};
          setUserData(response)
          setFriends(res.data.friendsOf)
        } else {
          setError(res.data.error)
        }
      });  
    }
  }, [id])

  return (
    <PageContainer>
      <div className='profile-page'>
        {userData && <UserInformation 
          userData={parseInt(id) === parseInt(user.id) ? user : userData} 
          friendsList={parseInt(id) === parseInt(user.id) ? friendsList : friends}
          postsLength={postsLength}
          isOwnProfile = {parseInt(id) === parseInt(user.id)}
          />}
        <UserPosts id={id} setPostsLength={setPostsLength}/>
        {error && <p>{error}</p>}
      </div>
    </PageContainer>
  )
}
