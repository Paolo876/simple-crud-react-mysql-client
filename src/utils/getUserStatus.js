const getUserStatus = (isLoggedIn, userStatus) => {
    if(isLoggedIn && userStatus === "online") return userStatus;
    if(isLoggedIn && userStatus === "idle") return userStatus;
    return "invisible";
}
export default getUserStatus;