import { useState } from "react";
import { useFriendsContext } from "./useFriendsContext";
import { domain } from "../variables";
import axios from "axios";

/* PURPOSE:
 *  to do FriendsContext actions with the use of axios.
 *  uses useFriendsContext custom hook as well for updating user context.
 * PARAMETERS:
 *    -
 * RETURN VALUE:
 *    login, logout, signup, updateProfile
 * FUNCTION SIGNATURE:
 *    useAuthActions(string)
 */


export default function useFriendsActions() {
  const { dispatch } = useFriendsContext();
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  //friendRequestActions (confirm/cancel friend requests)
  const friendRequestResponse = (action, id) => {
    if(!isLoading){
      console.log("RUN")
      setIsLoading(true)
      axios.post(`${domain}/friends/request-action`, 
        { action, id },
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken")
          }
        }).then(() => {
          dispatch({type: "HANDLE_FRIEND_REQUEST_RESPONSE", payload: { action, id }})
          setIsLoading(false)
        }).catch( err => {
          setError(err.message)
          setIsLoading(false)
        })  
    }
  }
  return {
    error,
    isLoading,
    friendRequestResponse
  }
}
