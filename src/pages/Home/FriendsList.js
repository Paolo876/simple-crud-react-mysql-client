import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserCardListItem from '../../components/UserCardListItem/UserCardListItem';
import { useFriendsContext } from "../../hooks/useFriendsContext";
import "./FriendsList.scss";

const getUserStatus = (isLoggedIn, userStatus) => {
  if(isLoggedIn && userStatus === "online") return userStatus;
  if(isLoggedIn && userStatus === "idle") return userStatus;
  return "invisible";
}

export default function FriendsList() {
  const navigate = useNavigate();
  const { friendsList } = useFriendsContext();

  return (
    <div className="friends">
      <span>Friends: </span>
      <ul className="friends-list">
        {friendsList && friendsList.map(item => (
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
