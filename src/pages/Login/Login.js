import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../variables';
// import "./Login.scss";
import useAuthActions from '../../hooks/useAuthActions';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Container, Typography, Paper, Button, FormControl, InputLabel, Input, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

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
        <Container sx={{display: 'flex', justifyContent:'center', alignItems: "center", height: "70%"}}>
            <Paper className='login-page' sx={{py: 5, px: {xs: 2, md:8}, width: "fit-content", mx: "auto"}}>
            <Typography variant="h4" fontWeight={700} mb={4} letterSpacing={3}><LoginIcon style={{verticalAlign:"middle"}} sx={{mr: 1}} fontSize="large"/> LOGIN</Typography>
                {/* <h3>LOGIN</h3> */}
                <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", my: 5}}>
                    <TextField 
                        id="username" 
                        type="text" 
                        label={<p><AccountCircleIcon 
                        style={{verticalAlign:"middle"}} sx={{mr: 1}}/> Username</p>} 
                        value={username} 
                        variant="outlined" 
                        onChange={e => setUsername(e.target.value)}
                        required
                        sx={{my:2}}
                    />
                    <TextField 
                        id="password" 
                        type="password" 
                        label={<p><KeyIcon 
                        style={{verticalAlign:"middle"}} sx={{mr: 1}}/> Password</p>} 
                        value={password} 
                        variant="outlined" 
                        onChange={e => setPassword(e.target.value)}
                        required
                        sx={{my:2}}
                    />
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
