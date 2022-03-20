import { makeStyles, Grid, Button, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { handle } from '../../utils/helpers';
import api from '../../redux/api';
import { useNavigate } from 'react-router';
import { GoogleLogin } from "react-google-login";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const theme = createTheme();

const SignUp = () => {
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const data = {
                username: formData.get('username'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                password: formData.get('password')
            }
            const response = await axios.post('http://localhost:8000/api/auth/register', data);
            window.location.href = '/login';
        } catch (error) {
            console.log("Error while sign up", error.message);
        }
    }

    const googleOnSubmit = async (response) => {
        try {
            const res = await axios.post('http://localhost:8000/api/auth/googleRegister', response);
            window.location.href = '/login';
        } catch (error) {
            console.log("Error while sign up", error.message);
        }
    }

    const failGoogleAuth = (reject) => {
        console.log("Failed to login with google");
    }

    // const classes = useStyles();
    
    return (
        <div style={{width: '100%', marginTop: '3%'}}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Contact Number"
                                        name="phone"
                                        autoComplete="phone"
                                        />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirm_password"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirm_password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                                <GoogleLogin
                                    id="google_signin_btn"
                                    theme="dark"
                                    clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                                    buttonText="Signup with Google"
                                    onSuccess={googleOnSubmit}
                                    onFailure={googleOnSubmit}
                                    cookiePolicy={"single_host_origin"}
                                    style={{minWidth: '400px'}}
                                />
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );


};
    export default SignUp;