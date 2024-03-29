import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { domain, friendsSocket } from '../../variables';
import { useNavigate } from 'react-router-dom';
import "./FriendResponseActions.scss";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ForumIcon from '@mui/icons-material/Forum';

const friendResponseOptions = [
    [{name: "Unfriend User", value: "unfriend"}, {name: "Block User", value: "block"}],
    [{name: "Cancel Friend Request", value: "cancel"}, {name: "Block User", value: "block"}],
    [{name: "Decline Friend Request", value: "delete"}, {name: "Block User", value: "block"}],
    [{name: "Send Friend Request", value: "request"}, {name: "Block User", value: "block"}],
];

export default function FriendResponseActions({  userRelationship, setUserRelationship, id }) {
    const [ showSelector, setShowSelector ] = useState(false);
    const [ selectedResponseOption, setSelectedResponseOption ] = useState(null);
    const navigate = useNavigate();
    useEffect(()=> {
      if(userRelationship === "friends") setSelectedResponseOption(friendResponseOptions[0])
      if(userRelationship === "pending") setSelectedResponseOption(friendResponseOptions[1])
      if(userRelationship === "awaiting-response") setSelectedResponseOption(friendResponseOptions[2])
      if(userRelationship === "no-relationship") setSelectedResponseOption(friendResponseOptions[3])
    }, [userRelationship]);
    const onFriendResponseClick = (action) => {
        axios.post(`${domain}/friends/request-action`, 
          { 
            action, id
          },{
            headers: {
              accessToken: sessionStorage.getItem("accessToken")
            }
          }).then(() => {
            if(action === "confirm") {
                setUserRelationship("friends")
            } else {
                setUserRelationship("no-relationship")
            }
          })
      }

      const onAddFriendClick = (action) => {
        axios.post(`${domain}/friends/add`, { id, action }, {
          headers: {
              accessToken: sessionStorage.getItem("accessToken")
            }
        }).then(res => {
          if(!res.data.error){
            friendsSocket.emit("onAddAndCancelFriend", res.data)
            if(res.data.action === "add") setUserRelationship("pending")
            if(res.data.action === "cancel") setUserRelationship("no-relationship")
          }
        })
      }
      const onAdditionalActionsClick = (action) => {
        if(action === "delete") onFriendResponseClick("delete");
        if(action === "request") onAddFriendClick("add");
        if(action === "cancel") onAddFriendClick("cancel");

        //block
        setShowSelector(false)
      }

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
  return (
    <div className={`friend-response-actions ${userRelationship}`}>
      <div className="friend-response-container">
      {showSelector && <div className="backdrop" onClick={() => setShowSelector(false)}></div>}

      {userRelationship === "friends" && <><button onClick={() => setShowSelector(true)} className="response-btn">Friends <PeopleOutlineIcon/></button><button onClick={() => setShowSelector(true)} className="selector-btn"><KeyboardArrowDownIcon/></button></>}
      {userRelationship === "pending" && <><button onClick={() => setShowSelector(true)} className="response-btn pending">Friend Request Sent <PersonAddAltIcon/></button><button onClick={() => setShowSelector(true)} className="selector-btn"><KeyboardArrowDownIcon/></button></>}
      {userRelationship === "awaiting-response" && <><button onClick={() => onFriendResponseClick("confirm")} className="response-btn">Confirm Friend Request <PersonAddAltIcon/></button><button onClick={() => setShowSelector(true)} className="selector-btn"><KeyboardArrowDownIcon/></button></>}
      {userRelationship === "no-relationship" && <><button onClick={() => onAddFriendClick("add")} className="response-btn">Send Friend Request <PersonAddAltIcon/></button><button onClick={() => setShowSelector(true)} className="selector-btn"><KeyboardArrowDownIcon/></button></>}
      {showSelector && <ul className='options'>
        {selectedResponseOption.map(item => <li key={item.value} onClick={() => onAdditionalActionsClick(item.value)}>{item.name}</li>)}
      </ul>}
      </div>
        
        <button className='message-btn' onClick={() => findChat(id)}><ForumIcon/></button>
    </div>
  )
}
