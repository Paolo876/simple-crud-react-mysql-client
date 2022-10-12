import React from 'react';
import "./PostBody.scss";
import { IKImage } from 'imagekitio-react';
export default function PostBody({ item}) {
  return (
    <div className="post-body">
        <h4>{item.title}</h4>
        {item.isPublic && <>
        <p>{item.postText.length > 200 ? `${item.postText.substr(0,200)}...`: item.postText}</p>
        {JSON.parse(item.postData) && <IKImage 
            src={JSON.parse(item.postData).photoURL} 
            alt="post-cover"
            urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}  
            transformation={[{
            height: 600
            }]}
        />}
        </>}
        {!item.isPublic && <p className='private-post'>This post is private. You must be friends with the user to see this post.</p>}
    </div>
  )
}
