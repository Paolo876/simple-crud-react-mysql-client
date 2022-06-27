import { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./components/Navbar/Navbar";
import './App.scss';

// pages
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/Post/Post';
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import useAuthActions from "./hooks/useAuthActions";
import ProfileSetup from "./pages/ProfileSetup/ProfileSetup";

function App() {
  const { user, authIsReady, isProfileSetup } = useAuthContext();
  const { logout } = useAuthActions();
  return (
    <div className="App">
      {authIsReady &&
        <>
          <Navbar/>
          <Routes>
            <Route element={ user && !isProfileSetup ? <ProfileSetup/> : <Navigate to='/login'/>} path="/profile-setup" />
            <Route element={ user ? <Home/> : <Navigate to='/login'/>} path="/" />
            <Route element={ user ? <CreatePost/> : <Navigate to='/login'/>} path="/create-post" />
            <Route element={ user ? <Post/> : <Navigate to='/login'/>} path="/post/:id" />
            <Route element={ user ? <Profile/> : <Navigate to='/login'/>} path="/profile/:id" />

            <Route element={ user ? <Navigate to="/"/> : <Login/>} path="/login" />
            <Route element={ user ? <Navigate to="/"/> : <Signup/>} path="/signup" />
          </Routes>
        </>
      }
    </div>
  );
}

export default App;
