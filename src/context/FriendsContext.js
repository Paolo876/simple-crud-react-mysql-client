import { createContext, useReducer, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { domain } from '../variables';
import FriendsListeners from './FriendsListeners/FriendsListeners';

const friendsStateInitialValues = {
  friendsList: [],
  friendRequests: [],
  isHeartbeatEnabled: false
}

export const FriendsContext = createContext();

export const friendsReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {...state, ...action.payload}
    case "USER_LOGOUT":
      return friendsStateInitialValues
    case "SET_FRIENDS_LIST":
      return { ...state, friendsList: action.payload}
    case 'SET_HEARTBEAT_UPDATE':
      return { ...state, friendsList: state.friendsList.map(item => {
        if(!action.payload.includes(item.id)) item.isLoggedIn = false;
        return item;
      })}
    case 'SET_CONNECTED_FRIEND': 
      return { ...state, friendsList : state.friendsList.map(item => {
        if(item.id === action.payload.id){
          item.isLoggedIn = true;
          item.userStatus = action.payload.userStatus;
        }
        return item
      })}
    case "HANDLE_FRIEND_REQUEST":
      console.log(action.payload)
      if(action.payload.action === "add") return { ...state, friendRequests: [ ...state.friendRequests, action.payload ]}
      if(action.payload.action === "cancel") return { ...state, friendRequests: state.friendRequests.filter(item => item.id !== action.payload.id)}

    case "TOGGLE_HEARTBEAT":
      return { ...state, isHeartbeatEnabled: action.payload}
    default:
      return state
  }
}

export const FriendsContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [ state, dispatch ] = useReducer(friendsReducer, friendsStateInitialValues)
  // run on user change --if user is not null, run functions
  useEffect(()=> {
    if(user){
      //fetch friends of user, filter friends and pending.
      axios.get(`${domain}/friends/user-friends/${user.id}`).then( res => {
        const friendsList = res.data.filter(item => item.relationship.status ==="friends");
        const friendRequests = res.data.filter(item => item.relationship.status ==="pending");
        dispatch({type: "USER_LOGIN", payload: { friendsList, friendRequests, isHeartbeatEnabled: true}})      
      })
      return () => {
        dispatch({type: "USER_LOGOUT"})
      }
    }
  }, [user])
  return (
    <FriendsContext.Provider value={{ ...state, dispatch }}>
      <>{ children }</>
      <FriendsListeners/>
    </FriendsContext.Provider>
  )
}
