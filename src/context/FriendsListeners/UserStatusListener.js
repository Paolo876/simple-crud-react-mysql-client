import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { FriendsContext } from "../FriendsContext";
import { usersSocket, domain } from "../../variables";
import axios from 'axios';

export default function ConnectedUserListener() {
    const { user, dispatch } = useContext(AuthContext);
    const { dispatch: friendsDispatch } = useContext(FriendsContext);
    const [ statusChange, setStatusChange ] = useState(null);
    
    useEffect(() => {
      if(user){
        //get current status of user on mount
        axios.get(`${domain}/auth/status/`, {
        headers: {
            accessToken: sessionStorage.getItem("accessToken")
        }
        }).then( res => {
            dispatch({type: "UPDATE_USERSTATUS", payload: res.data.userStatus})
        })

        usersSocket.on("statusChange", data => setStatusChange(data))
      } else {
        usersSocket.off("statusChange");
      }
    }, [user])
  
    useEffect(() => {
      if(statusChange) {
        if(user.id === statusChange.id){
            dispatch({type: "UPDATE_USERSTATUS", payload: statusChange.userStatus})
        } else {
            friendsDispatch({type: "FRIEND_STATUS_UPDATE", payload : statusChange})
        }
      }
    }, [statusChange])
  }