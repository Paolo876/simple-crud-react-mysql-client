import React from 'react';
import "./PostFooter.scss";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { IKImage } from 'imagekitio-react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import defaultAvatar from "../../assets/default-profile.png";

export default function PostFooter({ item, handleLikeClick }) {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const handleProfileClick = (e, id) => {
        e.stopPropagation();
        navigate(`/profile/${id}`)
      }

  return (
    <div className="post-footer">
        <div className="likes">
            {item.isPublic && <button onClick={ e => handleLikeClick(e, item.id)}>
                {!item.Likes.find(item => item.UserId === user.id) ? <FavoriteBorderIcon/> : <FavoriteIcon/>}
            </button>}
            {!item.isPublic && <button className='disabled-like-btn'><FavoriteBorderIcon/></button>}
            {item.Likes.length !== 0 && <p>{item.Likes.length}</p>}
        </div>
        <span>Posted by: 
        <button onClick={e => handleProfileClick(e, item.UserId)} className="like-button">
            {JSON.parse(item.User.userInformation).imageData ? 
            <IKImage 
                src={JSON.parse(item.User.userInformation).imageData.photoURL} alt="user avatar"
                urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                transformation={[{
                height: 20,
                width: 20
            }]}
            /> : 
            <img src={defaultAvatar} alt="user avatar"/>
            }
            {item.User.username}
        </button>
        </span>
        <p>{new Date(item.createdAt.toString()).toLocaleDateString()}</p>
    </div>
  )
}
