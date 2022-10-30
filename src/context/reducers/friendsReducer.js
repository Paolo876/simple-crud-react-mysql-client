export const friendsStateInitialValues = {
    friendsList: [],
    friendRequests: [],
    isHeartbeatEnabled: false
}

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
      case "FRIEND_STATUS_UPDATE":
        let friendsList = [ ...state.friendsList]
        let item = friendsList.find(item => item.id === action.payload.id);
        if(item) {
          item.userStatus = action.payload.userStatus
          return { ...state, friendsList }
        } else {
          let friendRequests = [ ...state.friendsList]
          let item = friendRequests.find(item => item.id === action.payload.id);
          if(item){
            item.userStatus = action.payload.userStatus
            return { ...state, friendRequests }
          }
        }
        return { ...state }
      case "HANDLE_FRIEND_REQUEST":
        if(action.payload.action === "add") return { ...state, friendRequests: [ ...state.friendRequests, action.payload ]}
        if(action.payload.action === "cancel") return { ...state, friendRequests: state.friendRequests.filter(item => item.id !== action.payload.id)}
      case "HANDLE_FRIEND_LOGOUT":
        return { ...state, friendsList: state.friendsList.map(item => {
          if(action.payload === item.id) item.isLoggedIn = false;
          return item;
        })}
      case "HANDLE_FRIEND_REQUEST_RESPONSE":
        let friend = state.friendRequests.find(item => item.id === action.payload.id);
        if(action.payload.action === "confirm") {
          friend.relationship = { status: "friends"}
          return { ...state, friendsList: [...state.friendsList, friend], friendRequests: [...state.friendRequests.filter(item => item !== friend)]}
        }
        if(action.payload.action === "delete") {
          return { ...state, friendRequests: [...state.friendRequests.filter(item => item !== friend)]}
        }
      case "TOGGLE_HEARTBEAT":
        return { ...state, isHeartbeatEnabled: action.payload}
      default:
        return state
    }
  }