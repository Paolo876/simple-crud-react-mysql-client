import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { domain } from '../../variables';
import PageContainer from "../../components/PageContainer/PageContainer";
import "./Post.scss";
import PostPreview from './PostPreview';
import CommentsPreview from './CommentsPreview';

export default function Post() {
    const { id } = useParams();
    const [ data, setData ] = useState(null);
    const [ comments, setComments ] = useState([]);

    useEffect(()=> {
        axios.get(`${domain}/posts/byId/${id}`).then(res => setData(res.data))
        axios.get(`${domain}/comments/${id}`).then(res => setComments(res.data))
    }, [])

  return (
    <PageContainer>
      <div className='post-page'>
      {data && 
        <>
          <PostPreview data={data}/>
          <CommentsPreview comments={comments} setComments={setComments}/>
        </>
      }
      </div>
    </PageContainer>
  )
}
