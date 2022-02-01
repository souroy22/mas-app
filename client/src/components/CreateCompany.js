import { makeStyles, Grid, TextField, Typography, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../redux/api';
import { handle } from '../utils/helpers';
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar
}))

const CreateCompany = () => {
    const classes = useStyles();
    const { register, handleSubmit, formState: {errors},reset, control} = useForm();
    const user = useSelector(state => state.authentication.user);
    const [createErros, setErrors] = React.useState(false);
    const [cookies] = useCookies(['user']);
    const navigate = useNavigate()

    const createCompany = async ({companyName, companyMail, companyPhone}) => {
        if (user !== null && user.id) {
            const config = {
                headers: { Authorization: `Bearer ${cookies.user.token}`}
            }

            const [company,error] = await handle(api.post('/company', {
                companyName,
                email: companyMail,
                phone: companyPhone,
                createdBy: user.id
            }, config))

            if (!error) {
                navigate('/company')
                setErrors(false)
            } else {
                setErrors(true)
            }
        }
    }

    const onSubmit = data => {
        createCompany(data)
        reset()
    }

    React.useEffect(() => {
        if (user && user.licenseInfo === "unpaid" && user.daysRemaining === null) {
            navigate("/")
        }
    }, [user])

    return (
        <div style={{width: '100%'}}>
            <div className={classes.toolbar} />

            <Grid container justify="center" style={{marginTop: '5%'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container justify="center" spacing={2}>
                        {
                            createErros && (
                                <Grid item xs={12} container justify="center">
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        Company name is already taken or server error.
                                    </Alert>
                                </Grid>
                            )
                        }
                        <Grid item xs={12} container justify="center">
                            <Typography>Create Company</Typography>
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <TextField id="companyName" {...register("companyName", {
                                required: "Company Name is required"
                            })} error={("companyName" in errors)} helperText={"companyName" in errors && errors.companyName.message} label="Company Name" variant="outlined" />
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <TextField id="companyMail" {...register("companyMail", {
                                required: "Company Email is required"
                            })} error={("companyMail" in errors)} helperText={"companyMail" in errors && errors.companyMail.message} label="Company Email" variant="outlined" />
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <TextField id="companyPhone" {...register("companyPhone", {
                                required: "Company Phone is required"
                            })} error={("companyPhone" in errors)} helperText={"companyPhone" in errors && errors.companyPhone.message} label="Company Phone" variant="outlined" />
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <Button variant="contained" color="primary" type="submit" disabled={Object.keys(errors).length > 0}>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </div>
    )
}

export default CreateCompany;