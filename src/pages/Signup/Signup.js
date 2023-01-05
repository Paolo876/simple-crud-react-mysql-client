import { Link } from 'react-router-dom';
import { Formik, Form } from "formik";
import { domain } from '../../variables';
import * as Yup from 'yup';
import useAuthActions from '../../hooks/useAuthActions';
import PageContainer from '../../components/PageContainer/PageContainer';
import MyTextField from '../../components/MyTextField';
import { Container, Typography, Paper, Button, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

export default function Signup() {
    const { signup, error, isLoading } = useAuthActions();

    const initialValues = {
        username: "",
        password: "",
        passwordConfirm: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(6).max(20).required(),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Password does not match.')
    })

    const handleSubmit = (data) => signup(`${domain}/auth`, {username: data.username, password: data.password});
    
  return (
    <PageContainer>
        <Container sx={{display: 'flex', justifyContent:'center', alignItems: "center", height: "70%"}}>
            <Paper sx={{py: 5, px: {xs: 2, md:8}, width: "fit-content", mx: "auto"}} elevation={4}>
                <Typography variant="h4" fontWeight={700} mb={4} letterSpacing={2}>Create an Account</Typography>
                <Formik  
                    initialValues={initialValues}
                    onSubmit={handleSubmit} 
                    validationSchema={validationSchema}
                >
                    <Form style={{display: "flex", flexDirection: "column", my: 5}}>
                        <MyTextField 
                            id="username" 
                            name="username"
                            type="text" 
                            label={<p><AccountCircleIcon style={{verticalAlign:"middle"}} sx={{mr: 1}}/>Username</p>} 
                            variant="outlined" 
                            sx={{my:1, minWidth: "320px"}}
                            required
                        />
                        <MyTextField 
                            id="password" 
                            name="password"
                            type="password" 
                            label={<p><KeyIcon style={{verticalAlign:"middle"}} sx={{mr: 1}}/>Password</p>} 
                            variant="outlined" 
                            sx={{my:1, minWidth: "320px"}}
                            autoComplete="off"
                            required
                        />
                        <MyTextField 
                            id="passwordConfirm" 
                            name="passwordConfirm"
                            type="password" 
                            label={<p><KeyIcon style={{verticalAlign:"middle"}} sx={{mr: 1}}/>Confirm Password</p>} 
                            variant="outlined" 
                            sx={{my:1, minWidth: "320px"}}
                            autoComplete="off"
                            required
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        {!isLoading && <Button variant="contained" type="submit" size="large" sx={{ mt: 5 }}>Sign up</Button>}
                        {isLoading && <Button variant="contained" type="submit" size="large" sx={{ mt: 5 }} disabled>Signing up...</Button>}
                    </Form>
                </Formik>
                <Typography variant="body2" mt={4}>Already a member? <Button  to="/signup" LinkComponent={Link} sx={{textTransform: "none"}}>Click here to login.</Button></Typography>

            </Paper>
        </Container>
    </PageContainer>
  )
}