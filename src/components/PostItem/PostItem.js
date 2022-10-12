import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./PostItem.scss";
import PostBody from './PostBody';
import PostFooter from './PostFooter';

export default function PostItem({ item, handleLikeClick }) {
  const navigate = useNavigate();

  return (
    <li 
        className={`post-item ${JSON.parse(item.postData) && item.isPublic ? 'with-image' : ''}`}
        onClick={() => navigate(`/post/${item.id}`)}
    >
      {!item.isPublic && <span className='privacy'><p>PRIVATE</p></span>}
      <PostBody item={item}/>
      <PostFooter item={item} handleLikeClick={handleLikeClick}/>
    </li>
  )
}
