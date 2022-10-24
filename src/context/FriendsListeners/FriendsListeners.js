import React from 'react'
import ConnectedUserListener from './ConnectedUserListener'
import FriendLogoutListener from './FriendLogoutListener'
import FriendRequestListener from './FriendRequestListener'
import HeartbeatListener from './HeartbeatListener'

export default function FriendsListeners() {
  return (
    <>
        <HeartbeatListener/>
        <ConnectedUserListener/>
        <FriendRequestListener/>
        <FriendLogoutListener/>
    </>
  )
}
