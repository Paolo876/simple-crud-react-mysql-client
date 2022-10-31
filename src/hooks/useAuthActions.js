import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

/* PURPOSE:
 *  to do authentication actions with the use of axios.
 *  uses useAuthContext custom hook as well for updating user context.
 * PARAMETERS:
 *    -
 * RETURN VALUE:
 *    login, logout, signup, updateProfile
 * FUNCTION SIGNATURE:
 *    useAuthActions(string)
 */


export default function useAuthActions() {
  const { dispatch } = useAuthContext();
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  const login = (url, data) => {
    setIsLoading(true);
    setError(null);
    axios.post(url, data, {
      headers: {"Access-Control-Allow-Origin": "*"}
    }).then((res) => {
        if(res.data.error) {
            setError(res.data.error)
        } else {
            if(res.data.userInformation) dispatch({type: "IS_PROFILE_SETUP", payload: true});
            dispatch({type: 'LOGIN', payload: res.data})
        }
        setIsLoading(false)
    })
  }

  // updated logout function --handled by socketio. user db is updated on serverside 
  const logout = (url, data) => {
    dispatch({type: "LOGOUT"})
  }

  const signup = (url, data) => {
    setIsLoading(true);
    setError(null);
    axios.post(url, data).then((res) => {
        if(res.data.error){
            setError(res.data.error)
        } else {
            dispatch({type: 'LOGIN', payload: res.data})
        }
        setIsLoading(false);
    })
  }

  const updateProfile = (url, data) => {
    setIsLoading(true);
    setError(null);
    axios.put(url, data, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      },
    }).then(res => {
      if(res.data.error){
        setError(res.data.error)
      } else {
        dispatch({type: 'IS_PROFILE_SETUP', payload: res.data})

      }
      setIsLoading(false);

    })
  }
  return {
    error,
    isLoading,
    login,
    logout,
    signup,
    updateProfile,
  }
}
