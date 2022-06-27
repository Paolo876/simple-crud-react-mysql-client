import React from 'react';
import { Link, NavLink } from "react-router-dom";
import useAuthActions from '../../hooks/useAuthActions';
import { useAuthContext } from '../../hooks/useAuthContext';

import "./Navbar.scss";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useAuthActions();
  console.log(user)
  return (
    <nav className='navbar'>
        {user && <>
        <Link to="/create-post">Create a Post</Link>
        <Link to="/">Home</Link>
        <Link to={`/profile/${user.id}`}>Profile</Link>
        <p className="username">{user.username}</p>
        <button onClick={logout}>Logout</button>

        </>}
        {!user && <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        </>}  
    </nav>
  )
}
