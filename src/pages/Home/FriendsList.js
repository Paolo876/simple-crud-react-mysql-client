import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserCardListItem from '../../components/UserCardListItem/UserCardListItem';
import { useFriendsContext } from "../../hooks/useFriendsContext";
import getUserStatus from '../../utils/getUserStatus';
import "./FriendsList.scss";

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
            source={"user-navigation"}
            />)
          )}
      </ul>
    </div>
  )
}
