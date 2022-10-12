import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import PageContainer from '../../components/PageContainer/PageContainer';

import "./Home.scss";
import PostsList from './PostsList';
import UserNavigation from './UserNavigation';

export default function Home() {
  const navigate = useNavigate();
  const { isProfileSetup } = useAuthContext();

  useEffect(()=> {
    if(!isProfileSetup) navigate("/profile-setup")
  }, []);
  
  return (
    <PageContainer>
      <div className='home'>
        {isProfileSetup && 
          <>
            <UserNavigation/>
            <PostsList />
          </>
        }
      </div>
    </PageContainer>
  )
}
