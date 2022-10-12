import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { domain } from '../../../variables';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { IKImage } from 'imagekitio-react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
// import { io } from "socket.io-client"

// media
import defaultAvatar from "../../../assets/default-profile.png";
import CloseIcon from '@mui/icons-material/Close';
import "./CommentsPreview.scss";

// const socket = io("http://localhost:3001")

export default function CommentsPreview({comments, setComments}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [ commentInput, setCommentInput ] = useState('');
    const [ error, setError ] = useState(null);

    
  //listen to data changes
    // useEffect(() => {
    //   socket.on("receive_comment", (data) => {
    //     console.log(data)
    //     // setReceived(data.message)
    //   })

    // },[socket])

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(`${domain}/comments`, {
          comment: commentInput,
          PostId: id,
          UserId: user.id
        }, {
          headers: {
            accessToken: sessionStorage.getItem("accessToken")
          }
        }).then((res) => {
          if(res.data.error){
            setError("Please log in.")
          } else {
            setComments(prevState => [...prevState, {...res.data, User: {username: user.username, userInformation: JSON.stringify(user.userInformation)}}]);
            setCommentInput('');
          }
        })
      }

    const deleteComment = (id) => {
        axios.delete(`${domain}/comments/${id}`, {
            headers: { accessToken: sessionStorage.getItem("accessToken") }
        }).then(() => {
            setComments(prevState => prevState.filter(item => item.id !== id))
        })
    }
  return (
    <div className="comments-preview">
        <form className="addCommentForm" onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <div className="user-avatar">
                {user.userInformation.imageData ? 
                    <IKImage 
                    src={user.userInformation.imageData.photoURL} alt="user avatar"
                    urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                    transformation={[{
                    height: 40,
                    width: 40
                    }]}
                    /> : 
                    <img src={defaultAvatar} alt="user avatar"/>
                }
            </div>
            <input type="text" name="title" placeholder='Write a comment...' value={commentInput} onChange={e => setCommentInput(e.target.value)}/>
            <button type="submit">Add Comment</button>
        </form>
        <ul className="commentsList">
            {comments.length === 0 && <p>This post has no comments to show.</p>}
            {comments.map((item, index) => (
                <li className='comment' key={index}>
                  <button className="user-avatar" onClick={() => navigate(`/profile/${item.UserId}`)}>
                    {JSON.parse(item.User.userInformation).imageData ? 
                        <IKImage 
                        src={JSON.parse(item.User.userInformation).imageData.photoURL} alt="user avatar"
                        urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                        transformation={[{
                        height: 40,
                        width: 40
                        }]}
                        /> : 
                        <img src={defaultAvatar} alt="user avatar"/>
                    }
                  </button>
                  <div className="body">
                    <p className='comment-text'>{item.comment}</p>
                    <div className="user-info">
                      <p className='user'>-{item.User.username}</p>
                      <p className='time'>{formatDistance(new Date(item.createdAt), new Date(), { addSuffix: true })}</p>
                    </div>
                  </div>
                  {item.UserId === user.id && <button onClick={() => deleteComment(item.id)}><CloseIcon/></button>}
                </li>
            ))}
        </ul>
    </div>
  )
}
