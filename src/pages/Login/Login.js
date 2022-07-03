import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../variables';
import "./Login.scss";
import useAuthActions from '../../hooks/useAuthActions';
import PageContainer from '../../components/PageContainer/PageContainer';
export default function Login() {
    const { login, isLoading, error} = useAuthActions();
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(`${domain}/auth/login`, { username, password });
    }
  return (
    <PageContainer>
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
                {!isLoading && <button className='submit-btn'>LOGIN</button>}
                {isLoading && <button className='submit-btn'>LOGGING IN...</button>}
            </form>
            <p>Not a user yet? <button onClick={() => navigate("/signup")} className="redirect">Click here to signup.</button></p>
        </div>
    </PageContainer>
  )
}
