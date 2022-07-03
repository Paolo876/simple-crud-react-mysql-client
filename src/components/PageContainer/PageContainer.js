import React from 'react';
import "./PageContainer.scss";

export default function PageContainer({children}) {
  return (
    <div className='page-container'>
        {children}
    </div>
  )
}
