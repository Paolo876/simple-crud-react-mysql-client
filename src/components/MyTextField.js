import React from 'react'
import { TextField, Alert } from '@mui/material';
import { useField } from 'formik';

const MyTextField = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
      <>
        <TextField 
            {...field} {...props} 
            label={label} 
        />
        {meta.touched && meta.error ? (
          <Alert severity="warning">{meta.error}</Alert>
        ) : null}
      </>
    );
};

export default MyTextField