import axios from 'axios';
import React, { useState } from 'react'
import "./Login.scss";
import { useAuthContext } from '../../hooks/useAuthContext';
export default function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const { dispatch } = useAuthContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://simple-crud-react-mysql.herokuapp.com/auth/login", { username, password })
            .then(
                (res) => {
                if(res.data.error) {
                    setError(res.data.error)
                } else {
                    sessionStorage.setItem("accessToken", res.data.accessToken) //save token to storage
                    dispatch({type: 'LOGIN', payload: res.data})    //save data to context
                }
            })
    }
  return (
    <div className='login-page'>
        <h3>LOGIN</h3>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Username:</span>
                <input 
                    type="text" 
                    onChange={ e => setUsername(e.target.value)}
                    value={username}
                    required
                    />
            </label>
            <label>
                <span>Password:</span>
                <input 
                    type="password" 
                    onChange={ e => setPassword(e.target.value)}
                    value={password}
                    autoComplete="off"
                    required
                    />
            </label>
            {error && <p className="error">{error}</p>}
            <button>LOGIN</button>
        </form>
    </div>
  )
}
