import React from 'react'
import { TextField, Alert } from '@mui/material';
import { useField } from 'formik';

const MyTextField = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
      <>
        { meta.touched && meta.error ? <Alert severity="warning">{meta.error}</Alert> : null }
        <TextField 
            {...field} {...props} 
            label={label} 
        />
      </>
    );
};

export default MyTextField