import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriendsContext } from '../../hooks/useFriendsContext';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import UserCardListItem from '../../components/UserCardListItem/UserCardListItem';
import "./FriendRequestsList.scss";
import useFriendsActions from '../../hooks/useFriendsActions';

export default function FriendRequestsList() {
  const navigate = useNavigate();
  const { friendRequests, isLoading } = useFriendsContext();
  const { friendRequestResponse } = useFriendsActions();

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
                  source={"user-navigation"}
                />
                <div className="actions">
                  <button onClick={() => friendRequestResponse("confirm", item.id)}><CheckIcon/></button>
                  <button onClick={() => friendRequestResponse("delete", item.id)}><CloseIcon/></button>
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
