import React from 'react';
import { makeStyles, Grid, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { handle } from '../../utils/helpers';
import api from '../../redux/api';
import { USER_LOGIN } from '../../utils/constants';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar
}))

const TryBuyPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user)
    const [cookies] = useCookies(['user']);
    const navigate = useNavigate();

    const updateUser = async updatedUser => {
        const config = {
            headers: { Authorization: `Bearer ${cookies.user.token}` }
        }

        const [result, error] = await handle(api.put(`users/${updatedUser.id}`, {...updatedUser}, config))
        
        if (!error) {
            dispatch({type: USER_LOGIN, payload: result.data})
        }
    }

    React.useEffect(() => {
        if (user && (user.daysRemaining !== null || user.daysRemaining > new Date() || user.licenseInfo === "paid")) {
            navigate('/company')
        }
    }, [user])

    return (
        <div style={{width: '100%'}}>
            <div className={classes.toolbar} />

            <Grid container justify="center" style={{marginTop: '5%'}} spacing={4}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => {
                        var date = new Date();
                        date.setDate(date.getDate() + 7);

                        const updatedUser = {...user, daysRemaining: date}

                        updateUser(updatedUser)
                    }}>
                        Try Now
                    </Button>
                </Grid>

                <Grid item>
                    <Button variant="contained" color="secondary" onClick={() => {
                        const updatedUser = {...user, licenseInfo: "paid"}
                        updateUser(updatedUser)
                    }}>
                        Buy Now
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default TryBuyPage;