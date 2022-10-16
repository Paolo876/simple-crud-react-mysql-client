import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

import PageContainer from '../../components/PageContainer/PageContainer';
import ChatBox from './ChatBox';
import ChatList from './ChatList';
import axios from 'axios';
import { domain, usersSocket } from '../../variables';
import "./Messages.scss";

export default function Messages() {
  const [ chatList, setChatList ] = useState(null);
  const [ newMessage, setNewMessage ] = useState(false);
  const [ newRoom, setNewRoom ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const params = useParams();
  const { user } = useAuthContext();
  //get list of chatrooms of user on mount
  useEffect(() => {
    //this request includes the last message on the chatroom
    usersSocket.on("chat-list-new-message", data => setNewMessage(data))
    usersSocket.on("chat-list-new-room", data => setNewRoom(data))
    setIsLoading(true)
    axios.get(`${domain}/chat/user-chatrooms`,{
      headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      }
      ).then( res => {
        if(!res.data.error){
          setChatList(res.data)
        }
        setIsLoading(false)
      })
  }, [])
  //update on new message
  useEffect(() => {
    if(newMessage) {
      setChatList(prevState => {
        const updatedList = [ ...prevState ]
        const { User, ...message } = newMessage
        const updatedItem = updatedList.find(item => parseInt(item.chatRoomId) === parseInt(newMessage.ChatRoomId))
        updatedItem.chat = message   //update latest message
        //mark unread if params is not equal to chatRoomId
        if(parseInt(params["*"]) !== parseInt(newMessage.ChatRoomId)) updatedItem.members.find(item => item.id === user.id).isLastMessageRead = false
        
        //put the new message to top of list --
        return [updatedItem, ...updatedList.filter(item => parseInt(item.chatRoomId) !== parseInt(newMessage.ChatRoomId))]
      })
    }
  }, [newMessage])

  //update on new room
  useEffect(() => {
    if(newRoom){
      setChatList(prevState => [newRoom, ...prevState])
    }
  }, [newRoom])
  return (
    <PageContainer>
        {chatList && <div className="messages-page">
            <ChatList isLoading={isLoading} chatList={chatList}/>
            <ChatBox setChatList={setChatList} chatList={chatList}/>
        </div>}
    </PageContainer>
  )
}
