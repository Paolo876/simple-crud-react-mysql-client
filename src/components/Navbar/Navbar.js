import React from 'react';
import { NavLink } from "react-router-dom";
import useAuthActions from '../../hooks/useAuthActions';
import { useAuthContext } from '../../hooks/useAuthContext';
import { IKImage } from 'imagekitio-react';

//media
import SettingsIcon from '@mui/icons-material/Settings';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import defaultAvatar from "../../assets/default-profile.png";
import ChatIcon from '@mui/icons-material/Chat';
import "./Navbar.scss";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useAuthActions();
  return (
    <nav className='navbar'>
      <ul className="container">
        {user && user.userInformation && <>
          <li><NavLink to="/"><HomeIcon/><span className="info">Home</span></NavLink></li>
          <li><NavLink to="/create-post"><PostAddIcon/><span className="info">Create Post</span></NavLink></li>
          <li><NavLink to="/settings"><ChatIcon/><span className="info">Messages</span></NavLink></li>

          <li className="user">
            <NavLink to={`/profile/${user.id}`}>
              {user.userInformation.imageData ? 
                <IKImage 
                  src={user.userInformation.imageData.photoURL} alt="user avatar"
                  urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
                  transformation={[{
                  height: 35,
                  width: 35
                }]}
                /> : 
                <img src={defaultAvatar} alt="user avatar"/>
              }
              <p>{user.username}</p>
              <span className="info">Profile</span>
            </NavLink>
          </li>
          <li><NavLink to="/settings"><SettingsIcon/><span className="info">Settings</span></NavLink></li>
          </>}
          {user && <li className='logout-item' style={{marginLeft: user.userInformation ? '': 'auto'}}><button onClick={logout}><LogoutIcon/><span className="info">Logout</span></button></li>}


          {!user && <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
          </>}  
      </ul>
    </nav>
  )
}
