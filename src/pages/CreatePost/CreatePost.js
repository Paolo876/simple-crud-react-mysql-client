import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../variables';
import { IKContext, IKUpload } from "imagekitio-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PageContainer from '../../components/PageContainer/PageContainer';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import * as Yup from 'yup';
import axios from "axios";
import AddImageForm from './AddImageForm';

//media
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import PhotoIcon from '@mui/icons-material/Photo';
import PostAddIcon from '@mui/icons-material/PostAdd';
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
        // title: Yup.string().required().matches(/^(\S+$)/g, 'This field must not be left blank.'),
        // postText: Yup.string().required().matches(/^(\S+$)/g, 'This field must not be left blank.'),
        title: Yup.string().required(),
        postText: Yup.string().required(),
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
            <h3>Create Post <PostAddIcon/></h3>
            <p className='description'>
                Please provide a short title for your post. The body will contain the message of your post.
                A public post is visible to every user while a private post is only for friends of the user.
                Adding a cover image for your post is optional.
            </p>
            <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint} >
                <Formik  
                    initialValues={initialValues}
                    onSubmit={handleSubmit} 
                    validationSchema={validationSchema}
                >
                    <Form>
                        <label>
                            <span>Title:</span>
                            <ErrorMessage name="title">{msg => <p className='error'>{msg}</p>}</ErrorMessage>
                            <Field 
                                id="title" 
                                name="title" 
                            />
                        </label>
                        <label>
                            <span>Body:</span>
                            <ErrorMessage name="postText">{msg => <p className='error'>{msg}</p>}</ErrorMessage>
                            <Field name="postText">
                                {({ field }) => <textarea {...field}/>}
                            </Field>
                        </label>
                        <span>Post Privacy:</span>
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
                                        accept="image/png, image/jpeg"
                                    />
                                </label>}
                            </li>
                        </ul>
                        {imageLoading && <LoadingSpinner/>}
                        {imageData && <AddImageForm imageData={imageData} setImageData={setImageData} handleRemoveImage={handleRemoveImage}/>}
                        {error && <p className="error">{error}</p>}
                        {!isLoading && !imageLoading && <button type='submit' className='submit-btn'>CREATE POST</button>}
                        {isLoading && imageLoading && <button type='submit' className='submit-btn' disabled><LoadingSpinner/></button>}
                        {!isLoading && !imageLoading && <button type='button' className='cancel-btn' onClick={() => navigate("/")}>CANCEL</button>}
                    </Form>
                </Formik>
            </IKContext>
        </div>
    </PageContainer>
  )
}
