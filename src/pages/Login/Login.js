import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { domain } from '../../variables';
import useAuthActions from '../../hooks/useAuthActions';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Container, Typography, Paper, Button, TextField, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import KeyIcon from '@mui/icons-material/Key';

export default function Login() {
    const { login, isLoading, error } = useAuthActions();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(`${domain}/auth/login`, { username, password });
    }
  return (
    <PageContainer>
        <Container sx={{display: 'flex', justifyContent:'center', alignItems: "center", height: "70%"}}>
            <Paper sx={{py: 5, px: {xs: 2, md:8}, width: "fit-content", mx: "auto"}} elevation={4}>
                <Typography variant="h4" fontWeight={700} mb={4} letterSpacing={3}><LoginIcon style={{verticalAlign:"middle"}} sx={{mr: 1}} fontSize="large"/>LOGIN</Typography>
                    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", my: 5}}>
                        <TextField 
                            id="username" 
                            type="text" 
                            label={<p><AccountCircleIcon style={{verticalAlign:"middle"}} sx={{mr: 1}}/>Username</p>} 
                            value={username} 
                            variant="outlined" 
                            onChange={e => setUsername(e.target.value)}
                            required
                            sx={{my:2, minWidth: "320px"}}
                        />
                        <TextField 
                            id="password" 
                            type="password" 
                            label={<p><KeyIcon style={{verticalAlign:"middle"}} sx={{mr: 1}}/>Password</p>} 
                            value={password} 
                            variant="outlined" 
                            onChange={e => setPassword(e.target.value)}
                            required
                            sx={{my:2, minWidth: "320px"}}
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        {!isLoading && <Button variant="contained" type="submit" size="large" sx={{ mt: 5 }}>Login</Button>}
                        {isLoading && <Button variant="contained" type="submit" size="large" sx={{ mt: 5 }} disabled>LOGGING IN...</Button>}
                    </form>
                <Typography variant="body2" mt={4}>Not a member yet? <Button  to="/signup" LinkComponent={Link} sx={{textTransform: "none"}}>Click here to signup.</Button></Typography>
            </Paper>
        </Container>
    </PageContainer>
  )
}
