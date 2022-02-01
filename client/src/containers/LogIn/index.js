import { makeStyles, Grid, Button, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { handle } from '../../utils/helpers';
import api from '../../redux/api';
import { USER_LOGIN, USER_LOGOUT } from '../../utils/constants';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar                                                                                                                                                                                                   
}))

const Login = () => {
    const { register, handleSubmit, formState: {errors},reset, control} = useForm();
    const [loginErros, setLoginErrors] = React.useState(false);
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(['user'])
    const user = useSelector(state => state.authentication.user);
    let navigate = useNavigate();

    const fetchUser = async (token, id) => {
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }

        const [result, error] = await handle(api.get(`users/${id}`, config))

        if (error) {
            dispatch({type: USER_LOGOUT, payload: {}})
            
        } else {
            dispatch({type: USER_LOGIN, payload: result.data})
        }

    }

    const login = async ({username, password}) => {
        const [credentials, credentialsError] = await handle(api.post("users/authenticate", {
            username,
            password
        }));

        if (credentialsError) {
            setLoginErrors(true)
        } else {
            setLoginErrors(false)

            setCookies('user', {
                token: credentials.data.token,
                id: credentials.data.id
            })
            
            dispatch({type: USER_LOGIN, payload: credentials.data})
        }
    }

    const onSubmit = data => {
        login(data)
        reset();
    }

    React.useEffect(() => {
        if (user && (user.daysRemaining !== null || user.daysRemaining > new Date() || user.licenseInfo === "paid")) {
            navigate('/company')
        } else if (user) {
            navigate('/')
        }
    }, [user])

    React.useEffect(() => {
        if (cookies.user) {
            fetchUser(cookies.user.token, cookies.user.id)
        }
    }, [cookies])

    const classes = useStyles();

    return (
        <div style={{width: '100%'}}>
            <div className={classes.toolbar} />
            
            <Grid container justify="center" style={{marginTop: '5%'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container justify="center" spacing={2}>
                        {
                            loginErros && (
                                <Grid item xs={12} container justify="center">
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        Username or password is incorrect
                                    </Alert>
                                </Grid>
                            )
                        }
                        <Grid item xs={12} container justify="center">
                            <TextField id="username" {...register("username", {
                                required: "User Name is required"
                            })} error={("username" in errors)} helperText={"username" in errors && errors.username.message} label="User Name" variant="outlined" />
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
                                    }
                                })} error={("password" in errors)} helperText={"password" in errors && errors.password.message} label="Password" variant="outlined" type="password" />
                        </Grid>

                        <Grid item xs={4} container justify="space-between" spacing={2}>
                            <Grid item>
                                <Button variant="contained" color="primary" type="submit" disabled={Object.keys(errors).length > 0}>Log In</Button>
                            </Grid>
                            
                            <Grid item>
                                <Button variant="outlined" color="primary" onClick={() => navigate('/signup')}>Sign Up</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </div>
      );
}

export default Login;