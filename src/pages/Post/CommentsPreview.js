import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { domain } from '../../variables';
import { useAuthContext } from '../../hooks/useAuthContext';
import { IKImage } from 'imagekitio-react';
import defaultAvatar from "../../assets/default-profile.png";

import "./CommentsPreview.scss";

export default function CommentsPreview({comments, setComments}) {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [ commentInput, setCommentInput ] = useState('');
    const [ error, setError ] = useState(null);
    console.log(comments)
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
            setComments(prevState => [...prevState, {...res.data, User: {username: user.username}}]);
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
                <p>{item.comment}</p>
                <p>{item.User.username}</p>
                {item.UserId === user.id && <button onClick={() => deleteComment(item.id)}>x</button>}
                </li>
            ))}
        </ul>
    </div>
  )
}
