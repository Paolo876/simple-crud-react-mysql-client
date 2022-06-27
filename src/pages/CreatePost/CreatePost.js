import React, { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../variables';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "./CreatePost.scss";
import axios from "axios";

export default function CreatePost() {
    const navigate = useNavigate();
    const { isProfileSetup } = useAuthContext();
    
    useEffect(()=>{
        if(!isProfileSetup) navigate("/profile-setup")
    }, [])
    const initialValues = {
        title:"",
        postText:"",
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
    })

    // formik already prevents default form submit behavior**
    const handleSubmit = (data) => {

        axios.post(`${domain}/posts`, data,{
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
              }
        }
        ).then(() => {
            navigate('/')
        })
    }
  return (
    <div className='create-post'>
        <Formik  
            initialValues={initialValues}
            onSubmit={handleSubmit} 
            validationSchema={validationSchema}
        >
            <Form>
                <label>
                    <span>Title:</span>
                    <ErrorMessage name="title">{msg => <p className='error'>**{msg}</p>}</ErrorMessage>
                    <Field 
                        id="inputCreatePost" 
                        name="title" 
                        placeholder="Title"
                    />
                </label>
                <label>
                    <span>Post:</span>
                    <ErrorMessage name="postText">{msg => <p className='error'>**{msg}</p>}</ErrorMessage>
                    <Field 
                        id="inputCreatePost" 
                        name="postText" 
                    />
                </label>

                <button type='submit'>Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}
