import React from 'react';
import PostItem from '../../components/PostItem/PostItem';

import "./PostsList.scss";

export default function PostsList({ posts }) {
    const handleLikeClick = () => {
        console.log("ASD")
      }
  return (
    <ul className='posts-list'>
        {posts.map( item => <PostItem item={item} handleLikeClick={handleLikeClick} key={item.id}/>)}
        {posts.length === 0 && <p className='no-posts'>No posts to show.</p>}
    </ul>
  )
}
