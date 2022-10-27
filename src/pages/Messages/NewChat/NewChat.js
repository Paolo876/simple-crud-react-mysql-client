import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { domain } from "../../../variables";
import UserCardListItem from "../../../components/UserCardListItem/UserCardListItem";
import getUserStatus from "../../../utils/getUserStatus";

import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import "./NewChat.scss";

export default function NewChat() {
  const navigate = useNavigate();
  const [ input, setInput ] = useState("");
  const [ inputResponse, setInputResponse ] = useState("");
  const [ data, setData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    let timeout;
    if(input.trim().length === 0) {
      setData(null)
      setIsLoading(false)
    };
    if(input.trim().length !== 0 && inputResponse !== input){
      setIsLoading(true)
      timeout = setTimeout(() => {
        setInputResponse(input)
        axios.get(`${domain}/auth/search/${input}`,{
          headers: {
              accessToken: sessionStorage.getItem("accessToken")
            }
          }).then(res => {
          setData(res.data)
          setIsLoading(false)
        })
      }, 500);
    
    }
    return () => clearTimeout(timeout)
  }, [input]);

  const findChat = (id) => {
    //find chat id, redirect user to link
    axios.post(`${domain}/chat/search-chat`, { id },{
      headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      }
      ).then( res => {
          if(res.data.error){
            navigate(`/messages/create/${id}`)

          } else {
            navigate(`/messages/${res.data}`)
          }
      })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
  }
  return (
    <div className='new-chat'>
      <form action="" className='find-recipient-form' onSubmit={handleSubmit}>
        <label htmlFor="">
          <span>To:</span>
          <input type="text" onChange={ e => setInput(e.target.value)} value={input} autoFocus/>
        </label>
      </form>
      <ul className="results">
        {data && data.map(item => <UserCardListItem 
          userInformation={item.userInformation}
          username={item.username}  
          onClick={() => findChat(item.id)}
          status={getUserStatus(item.isLoggedIn, item.userStatus)}
          showName={true}
          key={item.id}
          source={"user-navigation"}
          />)}
        {isLoading && <LoadingSpinner/>}

          {data && data.length === 0 && <p>No user found.</p>}
      </ul>
    </div>
  )
}
