import { makeStyles, Grid, Button, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { handle } from '../../utils/helpers';
import api from '../../redux/api';
import { useNavigate } from 'react-router';
import { GoogleLogin } from "react-google-login";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar                                                                                                                                                                                                   
}))

const Signup = () => {
    const { register, handleSubmit, formState: {errors},reset, control} = useForm();
    const [signUpErrors, setsignUpErrors] = React.useState(false);
    const navigate = useNavigate();

    const signup = async ({username, password, firstName, lastName, email}) => {
        const [credentials, credentialsError] = await handle(api.post("users/register", {
            username,
            password,
            firstName,
            lastName,
            email
        }));

        if (credentialsError) {
            setsignUpErrors(true)
        } else {
            setsignUpErrors(false)
            navigate("/login")
        }
    }

    const onSubmit = data => {
        signup(data)                         
        reset();
    }

    const googleOnSubmit = () => {
        console.log("Clicked");
    }

    const classes = useStyles();

    return (
        <div style={{width: '100%'}}>
            <div className={classes.toolbar} />
            
            <Grid container justify="center" style={{marginTop: '5%'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container justify="center" spacing={2}>
                        {
                            signUpErrors && (
                                <Grid item xs={12} container justify="center">
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        Username is already taken or server error.
                                    </Alert>
                                </Grid>
                            )
                        }
                        <Grid item xs={12} container justify="center">
                            <TextField id="firstName" {...register("firstName", {
                                required: "First Name is required"
                            })} error={("firstName" in errors)} helperText={"firstName" in errors && errors.firstName.message} label="First Name" variant="outlined" />
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <TextField id="lastName" {...register("lastName", {
                                required: "Last Name is required"
                            })} error={("lastName" in errors)} helperText={"lastName" in errors && errors.lastName.message} label="Last Name" variant="outlined" />
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <TextField id="email" {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Entered value does not match email format"
                                }
                            })} error={("email" in errors)} helperText={"email" in errors && errors.email.message} label="Email" variant="outlined" />
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <TextField id="username" {...register("username", {
                                required: "User Name is required"
                            })} error={("username" in errors)} helperText={"username" in errors && errors.username.message} label="User Name" variant="outlined" autoComplete="new-password" />
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <TextField id="password" {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Minimum length is 8 characters."
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Maximum length is 50 characters."
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                        message: "Password must contain at least one character, one number and one special character."
                                    }
                                })} error={("password" in errors)} helperText={"password" in errors && errors.password.message} label="Password" variant="outlined" type="password" autoComplete="new-password" />
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <Button variant="outlined" color="primary" type="submit" disabled={Object.keys(errors).length > 0}>Sign Up</Button>
                        </Grid>
                    </Grid>
                </form>
                <GoogleLogin
                    id="google-signin-btn"
                    theme="dark"
                    clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                    buttonText="Login with Google"
                    onSuccess={googleOnSubmit}
                    onFailure={googleOnSubmit}
                    cookiePolicy={"single_host_origin"}
          />
            </Grid>
        </div>
      );
}

export default Signup;