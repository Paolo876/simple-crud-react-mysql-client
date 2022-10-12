import React, { useState } from 'react';
import axios from 'axios';
import { domain } from '../../variables';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';

import "./PostPreview.scss";

export default function PostPreview({data}) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [ error, setError ] = useState(null);

  const deletePost = () => {
    const PostId = data.id;
    axios.delete(`${domain}/posts/${PostId}`, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
    }).then((res) => {
      if(!res.data.error){
        navigate("/")
      } else{
        setError(res.data.error)
      }
    })
  }
  return (
    <div className='post-preview'>
        <div className="container">
            <h1 className="title">{data.title}</h1>
            <p className="text">{data.postText}</p>
            <div className="footer">
            <p>{data.User.username}</p>
            <p>{new Date(data.createdAt).toLocaleDateString()}</p>
            {data.UserId === user.id && <button onClick={() => deletePost()}>delete</button>}
            </div>
        </div>
    </div>
  )
}
