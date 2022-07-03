import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { domain } from '../../variables';
import * as Yup from 'yup';
import "./Signup.scss";
import useAuthActions from '../../hooks/useAuthActions';
import PageContainer from '../../components/PageContainer/PageContainer';

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

    const handleSubmit = (data) => signup(`${domain}/auth`, {username: data.username, password: data.password});
    
  return (
    <PageContainer>
        <div className='signup-page'>
            <h3>SIGNUP</h3>
            <Formik  
                initialValues={initialValues}
                onSubmit={handleSubmit} 
                validationSchema={validationSchema}
            >
                <Form>
                    <label>
                        <span>Username:</span>
                        <ErrorMessage name="username">{msg => <p className='error'>**{msg}</p>}</ErrorMessage>
                        <Field 
                            id="username" 
                            name="username" 
                            type="text"
                        />
                    </label>
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
        </div>
    </PageContainer>
  )
}
