import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, } from "formik";
import { domain } from '../../variables';
import * as Yup from 'yup';
import MyTextField from '../../components/MyTextField';
import useAuthActions from '../../hooks/useAuthActions';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Container, Typography, Paper, Button, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Signup() {
    const { signup, error, isLoading } = useAuthActions();
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
        passwordConfirm: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(6).max(20).required(),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.')
    })

    // const handleSubmit = (data) => signup(`${domain}/auth`, {username: data.username, password: data.password});
    const handleSubmit = (data) => {
        console.log(data)
    };
    
  return (
    <PageContainer>
        <Container sx={{display: 'flex', justifyContent:'center', alignItems: "center", height: "70%"}}>
            <Paper sx={{py: 5, px: {xs: 2, md:8}, width: "fit-content", mx: "auto"}} elevation={4}>
                <Typography variant="h4" fontWeight={700} mb={4} letterSpacing={3}>Create an Account</Typography>
                <Formik  
                    initialValues={initialValues}
                    onSubmit={handleSubmit} 
                    validationSchema={validationSchema}
                >
                    <Form style={{display: "flex", flexDirection: "column", my: 5}}>
                        <MyTextField 
                            id="username" 
                            name="username"
                            type="text" 
                            label={<p><AccountCircleIcon style={{verticalAlign:"middle"}} sx={{mr: 1}}/>Username</p>} 
                            variant="outlined" 
                            sx={{my:2, minWidth: "320px"}}
                        />

                        <label>
                            <span>Password:</span>
                            <ErrorMessage name="password">{msg => <p className='error'>**{msg}</p>}</ErrorMessage>
                            <Field 
                                id="password" 
                                name="password" 
                                type="password"
                                autoComplete="off"
                            />
                        </label>
                        <label>
                            <span>Confirm Password:</span>
                            <ErrorMessage name="passwordConfirm">{msg => <p className='error'>**{msg}</p>}</ErrorMessage>
                            <Field 
                                id="passwordConfirm" 
                                name="passwordConfirm" 
                                type="password"
                                autoComplete="off"
                            />
                        </label>
                        {error && <p className="error">{error}</p>}
                        {!isLoading && <button type='submit' className='submit-btn'>SIGN UP</button>}
                        {isLoading && <button type='submit' className='submit-btn' disabled>SIGNING UP...</button>}
                    </Form>
                </Formik>
                <p>Already a user? <button onClick={() => navigate("/login")} className="redirect">Click here to login.</button></p>

            </Paper>
        </Container>
    </PageContainer>
  )
}