import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import {useDispatch,useSelector} from "react-redux"
import { USER_LOGOUT } from '../../utils/constants';
import CurrentTab from '../../redux/reducers/SetCurrentTab';

const useStyles = makeStyles((them) => ({
    root: {
        flexGrow: 1,
        zIndex: 4
    },
    title: {
        flexGrow: 1
    }
}))

export default function NavBar() {

    const classes = useStyles();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const dispatch = useDispatch();
    const {currentTab} = useSelector(state=>state.currentTab);
    return (
        <div className={classes.root}>
            <AppBar position="absolute" style={{paddingTop: 0}}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title} onClick={() => navigate("/")}>
                    {currentTab}
                    </Typography>

                    <IconButton color="inherit" onClick={() => {
                        removeCookie('user')
                        dispatch({type: USER_LOGOUT})
                    }}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}