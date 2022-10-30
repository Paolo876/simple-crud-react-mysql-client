import { createContext, useReducer, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { friendsReducer, friendsStateInitialValues } from './reducers/friendsReducer';
import axios from 'axios';
import { domain } from '../variables';
import FriendsListeners from './FriendsListeners/FriendsListeners';
import UserStatusListener from "./FriendsListeners/UserStatusListener";

export const FriendsContext = createContext();

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
      <UserStatusListener/>
    </FriendsContext.Provider>
  )
}
