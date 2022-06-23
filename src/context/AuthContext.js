import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload}
    case 'LOGOUT':
      sessionStorage.removeItem("accessToken")
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true }
    // case 'ALLOW_LOGIN':
    //   return { ...state, isLoginAllowed: action.payload }
    default:
      return state
  }
}


export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false,
    // isLoginAllowed: false,
  })

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, user => {
//       dispatch({ type: 'AUTH_IS_READY', payload: user })
//     })

//     return () => unsub();
//   }, [])

  // check for userToken saved
  useEffect(()=> {
    const userToken = sessionStorage.getItem("accessToken")
    if(userToken) {
      axios.get("https://simple-crud-react-mysql.herokuapp.com/auth/authorize", {
        headers: {
          accessToken: userToken
        },
      }).then( res => {
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