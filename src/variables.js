import io from "socket.io-client";

let domain;
if(!process.env.REACT_APP_DOMAIN_URL) {
    domain = "http://localhost:3001"
} else {
    domain = process.env.REACT_APP_DOMAIN_URL
};

let usersSocket;
if(!process.env.REACT_APP_USERSOCKET_URL) {
    usersSocket = io(`${domain}/users`, { transports: ['websocket'], upgrade: false, 'sync disconnect on unload': true })
} else {
    usersSocket = io(process.env.REACT_APP_SOCKET_URL)
};

let friendsSocket;
if(!process.env.REACT_APP_FRIENDSOCKET_URL) {
    friendsSocket = io(`${domain}/friends`, { transports: ['websocket'], upgrade: false, 'sync disconnect on unload': true })
} else {
    friendsSocket = io(process.env.REACT_APP_SOCKET_URL)
};

let chatSocket;
if(!process.env.REACT_APP_CHATSOCKET_URL) {
    chatSocket = io(`${domain}/chat`, { transports: ['websocket'], upgrade: false, 'sync disconnect on unload': true })
} else {
    chatSocket = io(process.env.REACT_APP_SOCKET_URL)
};


export { domain, usersSocket, friendsSocket, chatSocket };
