import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { makeStyles,Drawer, Box, IconButton, Divider, Typography } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from "react-router-dom";
import {setCurrentTab} from "../redux/actions";
import {useDispatch} from "react-redux";
import './side.css';


const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex: 3,
        position: 'relative',
        flexShrink: 0,
        width: theme.spacing.unit * 7
    },
    toolbar: theme.mixins.toolbar,
    settings: {
        position: 'fixed',
        bottom: 0
    },
    paper: {
        background: '#eeeeee',
        minWidth: "10%"
    }
}))

const Seconddrawer = ({orientation}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    return (
        <Drawer classes={{ paper: classes.paper }} variant="permanent" anchor={orientation} style={{zIndex: 3, position: 'relative', flexShrink: 0}}>
            <div className={classes.toolbar} />

            <Box flexDirection="column" justifyContent="flex-end" >
       
            <Link to="/company/:id/usecase" className='minbox3 mintext' >
                  <IconButton>
                  <MenuBookIcon /> 
                </IconButton>
                  <Typography style={{maxWidth: "fit-content",fontFamily: "arial",fontSize: "small"}} onClick={()=>dispatch(setCurrentTab("MANAGER"))}>Use Case Documents</Typography>
            </Link>


                <Divider />

                <Link to="/company/:id/Notes" className='minbox3 mintext' >
                  <IconButton>
                    <MenuBookIcon /> 
                </IconButton>
                      <Typography style={{maxWidth: "fit-content",fontFamily: "arial",fontSize: "small"}}onClick={()=>dispatch(setCurrentTab("SUPPORT"))}>Release Notes</Typography>
                </Link>
                <Divider />
            </Box>
        </Drawer>
    )
}

export default Seconddrawer;
