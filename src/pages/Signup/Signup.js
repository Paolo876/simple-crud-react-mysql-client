import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import "./Signup.scss";

export default function Signup() {
    const navigate = useNavigate();
    const [ error, setError ] = useState(null)
    const initialValues = {
        username: "",
        password: "",

    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(6).max(20).required(),
    })
    const handleSubmit = (data) => {
        axios.post("https://simple-crud-react-mysql.herokuapp.com/auth", data).then((res) => {
            if(res.data.error){
                setError(res.data.error)
            } else {
                navigate('/')
            }
        })
    }
  return (
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
                {error && <p className="error">{error}</p>}
                <button type='submit'>SIGN UP</button>
            </Form>
        </Formik>

    </div>
  )
}
