import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { IKImage } from "imagekitio-react";
import "./PostsList.scss";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function PostsList({postsList, handleLikeClick}) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleProfileClick = (e, id) => {
    e.stopPropagation();
    navigate(`/profile/${id}`)
  }
  console.log(postsList)
  return (
    <ul className='posts-list'>
        {postsList.map((item, index) => (
            <li 
            key={item.id} 
            className={`${JSON.parse(item.postData) && item.isPublic ? 'with-image' : ''}`}
            onClick={() => navigate(`/post/${item.id}`)}
            >
              <div className="body">
                <h4>{item.title}</h4>
                {item.isPublic && <>
                  <p>{item.postText.length > 200 ? `${item.postText.substr(0,200)}...`: item.postText}</p>
                  {JSON.parse(item.postData) && <IKImage 
                    src={JSON.parse(item.postData).photoURL} 
                    alt="post-cover"
                    urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                    transformation={[{
                      height: 600
                    }]}
                  />}
                </>}
                {!item.isPublic && <p className='private-post'>This post is private.</p>}
              </div>
              <div className="footer">
                  <div className="likes">
                      {<button onClick={ e => handleLikeClick(e, item.id, index)}>
                          {!item.Likes.find(item => item.UserId === user.id) ? <FavoriteBorderIcon/> : <FavoriteIcon/>}
                      </button>}
                      {item.Likes.length !== 0 && <p>{item.Likes.length}</p>}
                  </div>
                  <span>Posted by: <button onClick={e => handleProfileClick(e, item.UserId)}>{item.User.username}</button></span>
                  <p>{new Date(item.createdAt.toString()).toLocaleDateString()}</p>
              </div>
            </li>))
        }
    </ul>
  )
}
