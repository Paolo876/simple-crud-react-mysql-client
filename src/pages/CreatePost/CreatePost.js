import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../variables';
import { IKContext, IKUpload } from "imagekitio-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PageContainer from '../../components/PageContainer/PageContainer';
import * as Yup from 'yup';
import axios from "axios";
import AddImageForm from './AddImageForm';

//media
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import PhotoIcon from '@mui/icons-material/Photo';
import "./CreatePost.scss";


export default function CreatePost() {
    const navigate = useNavigate();
    const { isProfileSetup } = useAuthContext();
    const [ isPublic, setIsPublic ] = useState(true)
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ imageData, setImageData ] = useState(null);
    const [ imageLoading, setImageLoading ] = useState(false);

    const authenticationEndpoint = `${domain}/imagekit`;
    const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
    const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;
    
    useEffect(()=>{
        if(!isProfileSetup) navigate("/profile-setup")
    }, [])

    //trigger imageLoading state
    useEffect(() => {
        if(imageData) setImageLoading(false)
    },[imageData]);

    const handleRemoveImage = async () => {
        setImageLoading(true)
        axios.delete(`${domain}/imagekit/delete/${imageData.fileId}`, {
          headers: { accessToken: sessionStorage.getItem("accessToken") }
        }).then(() => {
          setImageData(null)
          setImageLoading(false)
        })
      }

    // form events
    const initialValues = {
        title:"",
        postText:"",
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required().matches(/^(\S+$)/g, 'This field must not be left blank.'),
        postText: Yup.string().required().matches(/^(\S+$)/g, 'This field must not be left blank.'),
    })

    const handleSubmit = (data) => {
        setIsLoading(true);
        setError(null);
        axios.post(`${domain}/posts`, {...data, isPublic, postData: JSON.stringify(imageData)},{
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
              }
        }
        ).then(() => {
            navigate('/')

        }).catch(err => {
            setError(err.message);
            setIsLoading(false);
        });
    }
  return (
    <PageContainer>
        <div className='create-post'>
            <h3>CREATE NEW POST</h3>
            <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint} >
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
                            <span>Body:</span>
                            <ErrorMessage name="postText">{msg => <p className='error'>**{msg}</p>}</ErrorMessage>
                            <Field name="postText">
                                {({ field }) => <textarea {...field}/>}
                            </Field>
                        </label>
                        <ul className="privacy">
                            {isPublic && <p className='privacy-info'>Public Posts allows anyone to view, comment, and like the post.</p>}
                            {!isPublic && <p className='privacy-info'>Private Posts only allows the author's friends to view, comment, and like the post.</p>}
                            <li>
                                <button className={isPublic ? 'active' : ''} type='button' onClick={() => setIsPublic(true)}>
                                    <PublicIcon/> Public
                                </button>
                            </li>
                            <li>
                                <button className={!isPublic ? 'active' : ''} type='button' onClick={() => setIsPublic(false)}>
                                    <LockIcon/> Private
                                </button>
                            </li>
                            <li>
                                {!imageLoading && <label>
                                    <p>Add Cover Image</p><PhotoIcon/> 
                                    <IKUpload
                                        fileName="post_image.png"
                                        useUniqueFileName={true}
                                        onError={(err) => setError(err)}
                                        folder={`/simple-crud-react-mysql/post-images`}
                                        onSuccess={data => setImageData({fileId: data.fileId, name: data.name, photoURL: data.url})}
                                        onChange={() => setImageLoading(true)}
                                    />
                                </label>}
                                {imageLoading && <div>
                                    <p>Loading Image...</p>
                                </div>}
                            </li>
                        </ul>
                        {imageData && <AddImageForm imageData={imageData} setImageData={setImageData} handleRemoveImage={handleRemoveImage}/>}
                        {error && <p className="error">{error}</p>}
                        {!isLoading && !imageLoading && <button type='submit' className='submit-btn'>CREATE POST</button>}
                        {isLoading && imageLoading && <button type='submit' className='submit-btn' disabled>LOADING...</button>}
                        {!isLoading && <button type='button' className='cancel-btn' onClick={() => navigate("/")}>CANCEL</button>}
                    </Form>
                </Formik>
            </IKContext>
        </div>
    </PageContainer>
  )
}
