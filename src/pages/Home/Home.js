import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { domain } from '../../variables';
import axios from 'axios';
import "./Home.scss";

export default function Home() {
  const [ postsList, setPostsList ] = useState(null);
  const navigate = useNavigate();
  const { user, isProfileSetup } = useAuthContext();
  
  useEffect(()=> {
    if(!isProfileSetup) navigate("/profile-setup")
    axios.get(`${domain}/posts`).then( res => {
      setPostsList(res.data)
    })
  }, [])

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
  const handleProfileClick = (e, id) => {
    e.stopPropagation();
    navigate(`/profile/${id}`)
  }
  return (
    <div className='home'>
        <ul>
            {postsList && postsList.map((item, index) => (
            <li 
              key={item.id} 
              className="post" 
              onClick={() => navigate(`/post/${item.id}`)}
            >
              <h4 className="title">{item.title}</h4>
              <p className="body">{item.postText}</p>
              <div className="footer">
                  <button onClick={e => handleProfileClick(e, item.UserId)}>{item.User.username}</button>
                  <p>{new Date(item.createdAt.toString()).toLocaleDateString()}</p>
                  {<button onClick={ e => handleLikeClick(e, item.id, index)}>{!item.Likes.find(item => item.UserId === user.id) ? "Like" : "Unlike"}</button>}
                  <p>{item.Likes.length}</p>
              </div>
            </li>))}
        </ul>
    </div>
  )
}
