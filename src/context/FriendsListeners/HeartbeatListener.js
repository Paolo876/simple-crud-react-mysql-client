import { useState, useEffect, useContext } from "react";
import { FriendsContext } from "../FriendsContext";
import usePrevious from "../../hooks/usePrevious";
import { usersSocket } from "../../variables";
import arrayEquals from "../../utils/arrayEquals";
// HeartbeatListener Component --listens to current connected friends. emits every 30 secs (socketio)
export default function HeartbeatListener() {
    const { isHeartbeatEnabled, dispatch } = useContext(FriendsContext);
    const [ heartbeat, setHeartbeat ] = useState([]);
    const prevHeartbeat = usePrevious(heartbeat);
    useEffect(() => {
      if(isHeartbeatEnabled){
        const interval = setInterval(() =>usersSocket.emit("heartbeat"), 30000) //emit heartbeat every 30secs
        usersSocket.on("heartbeat", data => setHeartbeat(data));
        return () => {
          clearInterval(interval);
        }
      } else {
        usersSocket.off("heartbeat");
        dispatch({type: "TOGGLE_HEARTBEAT", payload: false});
      }
    }, [isHeartbeatEnabled])
    console.log(heartbeat, prevHeartbeat)
    useEffect(() => {
      //if prevHeartbeat is not the same as new heartbeat, update friends
      if(prevHeartbeat && !arrayEquals(heartbeat, prevHeartbeat)){
        dispatch({type:"SET_HEARTBEAT_UPDATE", payload: heartbeat})
      }
    }, [heartbeat]);
  }

