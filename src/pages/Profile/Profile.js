import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { id } = useParams();
  const [ error, setError ] = useState(null);
  const [ data, setData ] = useState(null);
  const [ posts, setPosts ] = useState([]);
  const [ showInput, setShowInput ] = useState(false);
  useEffect(()=> {
    // get user info
    if(parseInt(id) === user.id) {
        setData(user);
    } else {
      axios.get(`https://simple-crud-react-mysql.herokuapp.com/auth/profile/${id}`).then(res => {
        if(!res.data.error){
          setData(res.data)
        } else {
          setError(res.data.error)
        }
      });
    }
    // get user posts
    axios.get(`https://simple-crud-react-mysql.herokuapp.com/posts/user/${id}`).then(res => {
      if(!res.data.error){
        setPosts(res.data)
      } else {
        setError(res.data.error)
      }
    });

  }, [id]);


  //password update
  const [ oldPassword, setOldPassword ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ newPasswordVerify, setNewPasswordVerify ] = useState('');
  const [ success, setSuccess ] = useState(null);
  const [ passwordError, setPasswordError ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(oldPassword.trim().length !== 0 && newPassword.trim().length !== 0 && newPasswordVerify.trim().length !== 0) {
      if(newPassword === newPasswordVerify) {
        axios.put("https://simple-crud-react-mysql.herokuapp.com/auth/changepassword", {
          oldPassword, newPassword
        },{
          headers: {
            accessToken: sessionStorage.getItem("accessToken")
          },
        }).then(res => {
          if(res.data.error){
            setPasswordError(res.data.error)
          } else {
            setShowInput(false)
            setSuccess(res.data)
          }
        })
      } else{
        setPasswordError("New Password must match.")
      }
    }
  }

  return (
    <div className='profile-page'>
    {data && 
        <div className="container">
            <div className="basicInfo">
              <p>Username: {data.username}</p>
              {!showInput && parseInt(id) === user.id && <button onClick={() => setShowInput(true)}>Change Password</button>}
              {showInput && 
                <form onSubmit={handleSubmit}>
                  <label>
                    <span>Enter old Password:</span>
                    <input 
                      type="text" 
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      required/>
                  </label>
                  <label>
                    <span>Enter new Password:</span>
                    <input 
                      type="text" 
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required/>
                  </label>
                  <label>
                    <span>Confirm new Password:</span>
                    <input 
                      type="text" 
                      value={newPasswordVerify}
                      onChange={e => setNewPasswordVerify(e.target.value)}
                      required/>
                  </label>
                  {passwordError && <p>{passwordError}</p>}
                  <button type="button" onClick={() => setShowInput(false)}>CANCEL</button>
                  <button type="submit">SAVE CHANGES</button>
                </form>
              }
              {success && <p>{success}</p>}
            </div>
            <ul className="posts">
            {posts && posts.map((item) => (
              <li 
                key={item.id} 
                className="post" 
                onClick={() => navigate(`/post/${item.id}`)}
              >
                <h4 className="title">{item.title}</h4>
                <p className="body">{item.postText}</p>
                <div className="footer">
                    <p>{new Date(item.createdAt.toString()).toLocaleDateString()}</p>
                    <p>{item.Likes.length}</p>
                </div>
              </li>))}
              {posts.length === 0 && <p>No posts to show.</p>}
            </ul>
        </div>
    }
    {error && <p>{error}</p>}

    </div>
  )
}
