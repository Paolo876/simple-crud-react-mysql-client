import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import UserCardListItem from '../../components/UserCardListItem/UserCardListItem';
import CreateIcon from '@mui/icons-material/Create';
import "./ChatList.scss";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function ChatList({isLoading, chatList}) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className='chat-list'>
        <div className="header item">
            <p>{user.username}</p>
            <button onClick={() => navigate("/messages/new")}><CreateIcon/></button>
        </div>
        {isLoading && <LoadingSpinner/>}
        <ul className='item'>
            <h3>Inbox</h3>
            {chatList && chatList.length === 0 && <p className='notice'>You have no messages in your inbox yet. Click the create icon to start a conversation with a user.</p>}
            {chatList && chatList.map(item => {
              //for private message (one user)  --length is 2 for sender and receiver
              if(item.members.length === 2){
                const member = item.members.find(_item => _item.id !== user.id);
                const isLastMessageRead = item.members.find(_item => _item.id === user.id).isLastMessageRead;
                return (
                  <UserCardListItem 
                      id={member.id} 
                      userInformation={member.userInformation} 
                      username={member.username} 
                      key={member.id} 
                      onClick={() => navigate(`/messages/${item.chatRoomId}`)}
                      // chat={(item.chat && item.chat.message) ? item.chat : null}
                      chat={item.chat ? item.chat : null}
                      isLastMessageRead={isLastMessageRead}
                  />)
              }
              //for group chat (multiple users) --
            })}
        </ul>
    </div>
  )
}
