import { useState, useEffect, useContext } from "react";
import { FriendsContext } from "../FriendsContext";
import { usersSocket } from "../../variables";

export default function ConnectedUserListener() {
    const { isHeartbeatEnabled, dispatch } = useContext(FriendsContext);
    const [ connectedUser, setConnectedUser ] = useState(null);
    
    useEffect(() => {
      if(isHeartbeatEnabled){
        usersSocket.on("onLogin", data => setConnectedUser(data))
      } else {
        usersSocket.off("onLogin");
      }
    }, [isHeartbeatEnabled])
  
    useEffect(() => {
      if(connectedUser) {
        dispatch({type: "SET_CONNECTED_FRIEND", payload: connectedUser})
        setConnectedUser(null)
      }
    }, [connectedUser])
  }