import { useState, useEffect, useContext } from "react";
import { FriendsContext } from "../FriendsContext";
import { usersSocket } from "../../variables";

//listen to new/cancelled friend requests (socketio)
export default function FriendRequestListener() {
  const { isHeartbeatEnabled, dispatch } = useContext(FriendsContext);
  const [ newFriendRequest, setNewFriendRequest ] = useState(null)
  useEffect(() => {
    if(isHeartbeatEnabled){
      usersSocket.on("newRequest", data => setNewFriendRequest(data))
    } else {
      usersSocket.off("newRequest");
    }
  }, [isHeartbeatEnabled])

  useEffect(() => {
    if(newFriendRequest) {
      dispatch({type: "HANDLE_FRIEND_REQUEST", payload: newFriendRequest})
      setNewFriendRequest(null)
    }
  }, [newFriendRequest])
}
