import React from 'react';
import { Routes, Route } from "react-router-dom";
import NewChat from './NewChat/NewChat';
import ChatBoxBody from './ChatBoxBody';
import NewChatBoxBody from './NewChat/NewChatBoxBody';

import "./ChatBox.scss"

export default function ChatBox({ setChatList, chatList }) {
  return (
    <div className='chatbox'>
      <Routes>
        <Route element={<NewChat/>} path="/new"/>
        <Route element={<ChatBoxBody setChatList={setChatList} chatList={chatList}/>} path="/:id"/>
        <Route element={<NewChatBoxBody/>} path="/create/:id"/>
      </Routes>
    </div>
  )
}
