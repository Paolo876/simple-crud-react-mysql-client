import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { domain } from '../variables'
export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      sessionStorage.setItem("accessToken", action.payload.accessToken)
      return { ...state, user: action.payload}
    case 'LOGOUT':
      sessionStorage.removeItem("accessToken")
      return { ...state, user: null, isProfileSetup: false }
    case 'IS_PROFILE_SETUP':
      if(action.payload){
        if(action.payload.accessToken) sessionStorage.setItem("accessToken", action.payload.accessToken);
        return { ...state, isProfileSetup: true, user: {...state.user, ...action.payload} }
      } else {
        return { ...state, isProfileSetup: action.payload }
      }
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true }
    default:
      return state
  }
}


export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false,
    isProfileSetup: false,
  })

  // check for accessToken saved on inital load
  useEffect(()=> {
    const accessToken = sessionStorage.getItem("accessToken")
    if(accessToken) {
      axios.get(`${domain}/auth/authorize`, {
        headers: {
          accessToken
        },
      }).then( res => {
        if(res.data.userInformation) dispatch({type: "IS_PROFILE_SETUP", payload: res.data.userInformation});
        dispatch({type: "AUTH_IS_READY", payload: res.data})
      })
    } else {
      dispatch({type: "AUTH_IS_READY", payload: null})

    }
  }, [])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}