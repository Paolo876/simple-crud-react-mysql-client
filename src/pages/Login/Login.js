import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { domain } from '../../variables';
import useAuthActions from '../../hooks/useAuthActions';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Container, Typography, Paper, Button, TextField, Alert, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import KeyIcon from '@mui/icons-material/Key';
import WelcomeMessage from '../../components/WelcomeMessage';

export default function Login() {
    const { login, isLoading, error } = useAuthActions();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        login(`${domain}/auth/login`, { username, password });
    }
  return (
    <PageContainer>
        <Container sx={{display: 'flex', justifyContent:'center', alignItems: "center", height: "95%"}}>
            <WelcomeMessage/>
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
                        <FormControl sx={{my:2, minWidth: "320px"}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password"><p><KeyIcon style={{verticalAlign:"middle"}} sx={{mr: 1}}/>Password</p></InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                required
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(prevState => !prevState)}
                                    onMouseDown={e => e.preventDefault()}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label={<p><KeyIcon style={{verticalAlign:"middle"}} sx={{mr: 1}}/>Password</p>}
                            />
                        </FormControl>
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
