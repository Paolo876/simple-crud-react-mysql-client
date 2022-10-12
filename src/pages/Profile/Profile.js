import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { domain } from '../../variables';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import UserInformation from './UserInformation';
import UserPosts from './UserPosts';
import PageContainer from "../../components/PageContainer/PageContainer";
import "./Profile.scss";

export default function Profile() {
  const navigate = useNavigate();
  const { isProfileSetup } = useAuthContext();
  const { id } = useParams();
  const [ error, setError ] = useState(null);
  const [ userData, setUserData ] = useState(null);
  const [ posts, setPosts ] = useState(null);

  useEffect(()=> {
    if(!isProfileSetup) navigate("/profile-setup")
        axios.get(`${domain}/auth/profile/${id}`).then(res => {
          if(!res.data.error){
            setUserData(res.data)
          } else {
            setError(res.data.error)
          }
        });
      // get user posts
      axios.get(`${domain}/posts/user/${id}`).then(res => {
        if(!res.data.error){
          setPosts(res.data)
        } else {
          setError(res.data.error)
        }
      });
  
  }, [id])
  return (
    <PageContainer>
      <div className='profile-page'>
        {userData && posts && <UserInformation userData={userData} postsLength={posts.length}/>}
        {posts && <UserPosts posts={posts}/>}
        {error && <p>{error}</p>}
      </div>
    </PageContainer>
  )
}
