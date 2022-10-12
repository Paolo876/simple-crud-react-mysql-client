import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCardListItem from '../../components/UserCardListItem/UserCardListItem';
import { usersSocket } from '../../variables';

import "./FriendsList.scss";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const getUserStatus = (isLoggedIn, userStatus) => {
  if(isLoggedIn && userStatus === "online") return userStatus;
  if(isLoggedIn && userStatus === "idle") return userStatus;
  return "invisible";
}

export default function FriendsList({friendsList, friendRequests}) {
  const navigate = useNavigate();
  const [ friends, setFriends ] = useState(friendsList);
  const [ connectedUser, setConnectedUser ] = useState(null);
  const [ heartbeat, setHeartbeat ] = useState(undefined);
  const prevHeartbeat = usePrevious(heartbeat);
  
  // run on updated friends list
  useEffect(() => {
    setFriends(friendsList);
  }, [friendsList])
  // run on mount
  useEffect(() => {
    usersSocket.on("onLogin", data => setConnectedUser(data))
    usersSocket.on("heartbeat", data => setHeartbeat(data))
    const interval = setInterval(() =>usersSocket.emit("heartbeat"), 5000)
    return () => {
      usersSocket.off("onLogin");
      usersSocket.off("heartbeat");
      clearInterval(interval);
    }
  }, []);

  // run when a user connects
  useEffect(() => {
    if(connectedUser) {
      setFriends(prevState => prevState.map(item => {
        const updatedItem = { ...item};
        if(item.id === connectedUser.id) {
          updatedItem.isLoggedIn = true;
          updatedItem.userStatus = connectedUser.userStatus;
        }
        return updatedItem;
      }))
      setConnectedUser(null)
    }
  }, [connectedUser])

  useEffect(() => {
    //if prevHeartbeat is not the same as new heartbeat, update friends
    if(heartbeat && prevHeartbeat && JSON.stringify(heartbeat.sort()) !== JSON.stringify(prevHeartbeat.sort())){
        setFriends(prevState => prevState.map(item => {
          const updatedItem = { ...item};
          if(heartbeat.includes(item.id)) {
            updatedItem.isLoggedIn = true;
          } else {
            updatedItem.isLoggedIn = false;
          }
          return updatedItem;
        }))  
    }
  }, [heartbeat]);

  return (
    <div className="friends">
      <span>Friends: </span>
      <ul className="friends-list">
        {friends && friends.map(item => (
            <UserCardListItem 
            id={item.id} 
            userInformation={item.userInformation} 
            username={item.username} 
            key={item.id} 
            onClick={() => navigate(`/profile/${item.id}`)}
            status={getUserStatus(item.isLoggedIn, item.userStatus) }
            />)
          )}
      </ul>
    </div>
  )
}
