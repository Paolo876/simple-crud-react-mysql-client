import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { domain } from '../../variables';
import PostItem from '../../components/PostItem/PostItem';

//media
import AddIcon from '@mui/icons-material/Add';
import "./PostsList.scss";


export default function PostsList() {
  const navigate = useNavigate();
  const [ postsList, setPostsList ] = useState(null);

  useEffect(() => {
    axios.get(`${domain}/posts`).then( res => {
      setPostsList(res.data)
    })
  }, []);

  const handleLikeClick = (e, PostId ) => {
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
    <ul className='posts-list'>
      <li 
        onClick={() => navigate(`/create-post`)}
        className="create-post-item"
        ><span>Create New Post</span>
        <AddIcon/>
      </li>
      {postsList && postsList.map( item => <PostItem item={item} handleLikeClick={handleLikeClick} key={item.id}/>)}
    </ul>
  )
}
