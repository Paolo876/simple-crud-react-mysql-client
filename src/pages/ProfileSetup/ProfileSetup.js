import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthActions from "../../hooks/useAuthActions";
import { useAuthContext } from '../../hooks/useAuthContext';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { domain } from '../../variables';
import * as Yup from 'yup';

import "./ProfileSetup.scss";
import UploadImageForm from './UploadImageForm';

export default function ProfileSetup() {
    const { user } = useAuthContext();
    const { error, isLoading, updateProfile } = useAuthActions();
    const [ imageData, setImageData ] = useState(null);
    const [ imageLoading, setImageLoading ] = useState(false);
    const initialValues = {
        firstName: "",
        lastName: "",
        birthday: "",
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        birthday: Yup.date(),
    })

    const handleSubmit = data => {
        updateProfile(`${domain}/user-updates/updateProfile`, {userInformation: JSON.stringify({...data, imageData})})
    }
  return (
    <div className='profile-setup-page'>
        <h1>Welome, {user.username}!</h1>
        <h3>Before you start, let's setup your profile.</h3>
        <UploadImageForm 
            setImageData={setImageData} 
            imageData={imageData} 
            imageLoading={imageLoading}    
            setImageLoading={setImageLoading}
            />
        <Formik  
            initialValues={initialValues}
            onSubmit={handleSubmit} 
            validationSchema={validationSchema}
        >
            <Form>
                <label>
                    <span>First Name:</span>
                    <ErrorMessage name="firstName">{msg => <p className='error'>**{msg}</p>}</ErrorMessage>
                    <Field 
                        id="firstName" 
                        name="firstName" 
                        type="text"
                    />
                </label>
                <label>
                    <span>Last Name:</span>
                    <ErrorMessage name="lastName">{msg => <p className='error'>**{msg}</p>}</ErrorMessage>
                    <Field 
                        id="lastName" 
                        name="lastName" 
                        type="text"
                    />
                </label>
                <label>
                    <span>Birthday: <small>(optional)</small></span>
                    <ErrorMessage name="birthday">{msg => <p className='error'>**{msg}</p>}</ErrorMessage>
                    <Field 
                        id="birthday" 
                        name="birthday" 
                        type="date"
                    />
                </label>
                {error && <p className="error">{error}</p>}
                {!isLoading && !imageLoading && <button type='submit' className='submit-btn'>SAVE CHANGES</button>}
                {imageLoading && <button type='submit' className='submit-btn' disabled>LOADING, PLEASE WAIT...</button>}
                {isLoading && <button type='submit' className='submit-btn' disabled>SAVING CHANGES...</button>}
            </Form>
        </Formik>
    </div>
  )
}
