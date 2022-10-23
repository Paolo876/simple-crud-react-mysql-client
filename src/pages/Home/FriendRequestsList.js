import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriendsContext } from '../../hooks/useFriendsContext';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import UserCardListItem from '../../components/UserCardListItem/UserCardListItem';
import axios from 'axios';
import { domain } from '../../variables';
import "./FriendRequestsList.scss";

export default function FriendRequestsList() {
  const navigate = useNavigate();
  const { friendRequests } = useFriendsContext();
  // const clickHandler = (action, id) => {
  //   axios.post(`${domain}/friends/request-action`, 
  //     { 
  //       action, id
  //     },{
  //       headers: {
  //         accessToken: sessionStorage.getItem("accessToken")
  //       }
  //     }).then(() => {
  //       if(action === "confirm") {
  //         setFriendsList(prevState => prevState.map(item => {
  //           const updatedItem = { ...item };
  //           if(item.id === id) {
  //             updatedItem.relationship.status = "friends";
  //           }
  //           return updatedItem;
  //         }))
  //       } else {
  //         setFriendsList(prevState => prevState.filter( item => item.id !== id))
  //       }
  //     })
  // }
  const clickHandler = (action, id) => {
    console.log(action, id)
  }
  return (
    <div className='friend-requests'>
    {friendRequests.length > 0 && 
        <>
          <span>Friend Requests: </span>
          <ul className="requests">
            {friendRequests.map(item => (
              <div key={item.id} className="list-item">
                <UserCardListItem 
                  id={item.id} 
                  userInformation={item.userInformation} 
                  username={item.username}
                  onClick={() => navigate(`/profile/${item.id}`)}
                />
                <div className="actions">
                  <button onClick={() => clickHandler("confirm", item.id)}><CheckIcon/></button>
                  <button onClick={() => clickHandler("delete", item.id)}><CloseIcon/></button>
                </div>
               </div>
            ))}
          </ul>
        </>
        }
    </div>
  )
}


// to update: get realtime list of friend requests, not directly from db
