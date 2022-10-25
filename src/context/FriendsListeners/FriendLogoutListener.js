import { useState, useEffect, useContext } from "react";
import { FriendsContext } from "../FriendsContext";
import { usersSocket } from "../../variables";

// FriendLogoutListener Component --listens to friends manually logging out of the app.
export default function FriendLogoutListener({ setHeartbeat }) {
    const { isHeartbeatEnabled, dispatch } = useContext(FriendsContext);
    const [ friendLogout, setFriendLogout ] = useState(null)
    useEffect(() => {
      if(isHeartbeatEnabled){
        usersSocket.on("friend_logout", data => setFriendLogout(data))
      } else {
        usersSocket.off("friend_logout");
      }
    }, [isHeartbeatEnabled])
  
    useEffect(() => {
      if(friendLogout) {
        setHeartbeat(prevState => prevState.filter(item => item !== friendLogout))
        dispatch({type: "HANDLE_FRIEND_LOGOUT", payload: friendLogout})
        setFriendLogout(null)
      }
    }, [friendLogout])
}
