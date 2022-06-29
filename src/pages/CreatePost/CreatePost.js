import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../variables';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "./CreatePost.scss";
import axios from "axios";

import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import PhotoIcon from '@mui/icons-material/Photo';
import AddImageForm from './AddImageForm';
export default function CreatePost() {
    const navigate = useNavigate();
    const { isProfileSetup } = useAuthContext();
    const [ privacy, setPrivacy ] = useState("public")
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

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

    const handleSubmit = (data) => {
        console.log(data)
        // axios.post(`${domain}/posts`, data,{
        //     headers: {
        //         accessToken: sessionStorage.getItem("accessToken")
        //       }
        // }
        // ).then(() => {
        //     navigate('/')
        // })
    }
  return (
    <div className='create-post'>
        <h3>CREATE NEW POST</h3>
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
                        id="title" 
                        name="title" 
                    />
                </label>
                <label>
                    <span>Post:</span>
                    <ErrorMessage name="postText">{msg => <p className='error'>**{msg}</p>}</ErrorMessage>
                    <Field name="postText">
                        {({ field }) => <textarea {...field}/>}
                    </Field>
                </label>
                <ul className="privacy">
                    <li>
                        <button className={privacy === "public" ? 'active' : ''} type='button' onClick={() => setPrivacy("public")}>
                            <PublicIcon/> Public
                        </button>
                    </li>
                    <li>
                        <button className={privacy === "private" ? 'active' : ''} type='button' onClick={() => setPrivacy("private")}>
                            <PeopleIcon/> Friends only
                        </button>
                    </li>
                    <li>
                        <div>
                            <p>Add Image</p><PhotoIcon/> 
                        </div>
                    </li>
                    
                </ul>

                <AddImageForm/>
                {error && <p className="error">{error}</p>}
                {!isLoading && <button type='submit' className='submit-btn'>CREATE POST</button>}
                {isLoading && <button type='submit' className='submit-btn' disabled>LOADING...</button>}
                {!isLoading && <button type='button' className='cancel-btn' onClick={() => navigate("/")}>CANCEL</button>}

            </Form>
        </Formik>
    </div>
  )
}
