import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import './App.scss';

// pages
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/Post/Post';
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";

function App() {
  const { user, dispatch, authIsReady } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
      {authIsReady &&
        <>
          <nav>
            {user && <>
              <Link to="/create-post">Create a Post</Link>
              <Link to="/">Home</Link>
              <Link to={`/profile/${user.id}`}>Profile</Link>
              <p className="username">{user.username}</p>
              <button onClick={() => dispatch({type: "LOGOUT"})}>Logout</button>

            </>}
            {!user && <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>}
            
          </nav>
          <Routes>
            <Route element={ user ? <Home/> : <Navigate to='/login'/>} path="/" />
            <Route element={ user ? <CreatePost/> : <Navigate to='/login'/>} path="/create-post" />
            <Route element={ user ? <Post/> : <Navigate to='/login'/>} path="/post/:id" />
            <Route element={ user ? <Profile/> : <Navigate to='/login'/>} path="/profile/:id" />

            <Route element={ user ? <Navigate to="/"/> : <Login/>} path="/login" />
            <Route element={ user ? <Navigate to="/"/> : <Signup/>} path="/signup" />
          </Routes>
        </>
      }
      </BrowserRouter>
    </div>
  );
}

export default App;
