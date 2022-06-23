import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Post.scss";

export default function Post() {
    const { id } = useParams();
    const [ data, setData ] = useState(null);
    const [ commentInput, setCommentInput ] = useState('');
    const [ comments, setComments ] = useState([]);
    const [ error, setError ] = useState(null);
    const { user } = useAuthContext();
    const navigate = useNavigate();
    useEffect(()=> {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then(res => setData(res.data))
        axios.get(`http://localhost:3001/comments/${id}`).then(res => setComments(res.data))
    }, [])

    // comment submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      axios.post(`http://localhost:3001/comments`, {
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
      axios.delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      }).then(() => {
        setComments(prevState => prevState.filter(item => item.id !== id))
      })
    }

    const deletePost = () => {
      const PostId = data.id;
      axios.delete(`http://localhost:3001/posts/${PostId}`, {
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
    <div className='post-page'>
    {data && 
      <>
        <div className="section-1">
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
        <div className="section-2">
          <div className="container">
            <form className="addCommentForm" onSubmit={handleSubmit}>
              {error && <p>{error}</p>}
              <input type="text" name="title" placeholder='Comment...' value={commentInput} onChange={e => setCommentInput(e.target.value)}/>
              <button type="submit">Add Comment</button>
            </form>
            <ul className="commentsList">
              {comments.map((item, index) => (
                <li className='comment' key={index}>
                  <p>{item.comment}</p>
                  <p>{item.User.username}</p>
                  {item.UserId === user.id && <button onClick={() => deleteComment(item.id)}>x</button>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    }
    </div>
  )
}
