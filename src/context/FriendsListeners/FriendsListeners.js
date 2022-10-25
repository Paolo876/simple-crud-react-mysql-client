import React, { useState } from 'react'
import ConnectedUserListener from './ConnectedUserListener'
import FriendLogoutListener from './FriendLogoutListener'
import FriendRequestListener from './FriendRequestListener'
import HeartbeatListener from './HeartbeatListener'

export default function FriendsListeners() {
  const [ heartbeat, setHeartbeat ] = useState([]);
  return (
    <>
        <HeartbeatListener heartbeat={heartbeat} setHeartbeat={setHeartbeat}/>
        <ConnectedUserListener setHeartbeat={setHeartbeat}/>
        <FriendRequestListener/>
        <FriendLogoutListener setHeartbeat={setHeartbeat}/>
    </>
  )
}
