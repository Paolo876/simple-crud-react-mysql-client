import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../variables';
// import "./Login.scss";
import useAuthActions from '../../hooks/useAuthActions';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Container, Typography, Paper, Button, FormControl, InputLabel, Input, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
        <Container>
            <Paper className='login-page' sx={{py: 5, px: 10, width: "fit-content", mx: "auto"}}>
            <Typography variant="h4" fontWeight={600} mb={5}><LoginIcon style={{verticalAlign:"middle"}} sx={{mr: 1}} fontSize="large"/> Login</Typography>
                {/* <h3>LOGIN</h3> */}
                <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", my: 5}}>
                    <TextField 
                        id="username" 
                        label={<p><AccountCircleIcon 
                        style={{verticalAlign:"middle"}} sx={{mr: 1}}/> Username</p>} 
                        value={username} 
                        variant="outlined" 
                        onChange={e => setUsername(e.target.value)}
                    />
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
            </Paper>
        </Container>
    </PageContainer>
  )
}
