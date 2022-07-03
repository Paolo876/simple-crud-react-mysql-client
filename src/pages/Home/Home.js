import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { domain } from '../../variables';
import axios from 'axios';
import PageContainer from '../../components/PageContainer/PageContainer';
import "./Home.scss";
import PostsList from './PostsList';

export default function Home() {
  const [ postsList, setPostsList ] = useState(null);
  const navigate = useNavigate();
  const { isProfileSetup } = useAuthContext();
  
  useEffect(()=> {
    if(!isProfileSetup) navigate("/profile-setup")
    axios.get(`${domain}/posts`).then( res => {
      setPostsList(res.data)
    })
  }, []);

  const handleLikeClick = (e, PostId, index) => {
    e.stopPropagation();
    axios.post(`${domain}/likes`, {
      PostId
    },
    {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
    }).then((res) => {
      if(res.data.isLiked){
        const data = (({ id, PostId, UserId }) => ({ id, PostId, UserId }))(res.data.response);
        setPostsList(prevState => prevState.map(item => {
          if(item.id === data.PostId){
            return {...item, Likes: [...item.Likes, data]}
          } else {
            return item;
          }
        }))
      } else {
        const id = res.data.response.id;
        setPostsList(prevState => prevState.map(item => {
          if(item.id === PostId){
            const updatedLikes = item.Likes.filter(item => item.id !== id)
            return {...item, Likes: updatedLikes}
          } else {
            return item;
          }
        }))
      }
    })
  }

  return (
    <PageContainer>
      <div className='home'>
        {/* <div className="filter">
          <select name="" id="">
            <option value="most-popular">Most Popular</option>
            <option value="most-recent">Most Recent</option>
          </select>
        </div> */}
        {postsList && <PostsList postsList={postsList} handleLikeClick={handleLikeClick} />}
      </div>
    </PageContainer>
  )
}
