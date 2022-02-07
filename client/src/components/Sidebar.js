import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { makeStyles,Drawer, Box, IconButton, Divider, Typography ,Grid } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from "react-router-dom";
import {setCurrentTab} from "../redux/actions"
import {useDispatch} from "react-redux"
import './side.css';


const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex: 3,
        position: 'relative',
        flexShrink: 0,
        minWidth: '10%',
    },
    toolbar: theme.mixins.toolbar,
    settings: {
        position: 'fixed',
        bottom: 0
    },
    paper: {
        background: '#eeeeee',
        width: '10%',
    }
}))

const Sidebar = ({orientation}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    return (
        <Drawer classes={{ paper: classes.paper }} variant="permanent" anchor={orientation} style={{zIndex: 3, position: "relative", 
          flexShrink: 0}}>
            <div className={classes.toolbar} />

            <Box flexDirection="column" justifyContent="center" minWidth="100%" alignItems="center">
                 
                <Grid className="minbox2" onClick={()=>dispatch(setCurrentTab("MANAGER"))} >
                <IconButton>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                </IconButton>
                <Typography onClick={()=>dispatch(setCurrentTab("MANAGER"))}>Manage</Typography>
                </Grid>

                <Divider />

                <Grid className="minbox2" onClick={()=>dispatch(setCurrentTab("AUTOMATE"))} >
                <IconButton>
                <MenuBookIcon /> 
                </IconButton >
                     <Typography onClick={()=>dispatch(setCurrentTab("AUTOMATE"))}>Automate</Typography>
                </Grid>


                <Divider />

                <Grid className="minbox2" onClick={()=>dispatch(setCurrentTab("SUPPORT"))} >
                  <IconButton>
                    <MenuBookIcon /> 
                </IconButton>
                      <Typography onClick={()=>dispatch(setCurrentTab("SUPPORT"))}>Support</Typography>
                </Grid>
                <Divider />
        
                

                <div className={classes.settings}>
                    <Divider />
                    <IconButton>
                    <MenuBookIcon />
                    </IconButton>
                    <IconButton>
                        <Link to="/company/:id/Settings">
                        <SettingsIcon />
                        </Link>
                    </IconButton>
                </div>
            </Box>
        </Drawer>
    )
}

export default Sidebar;
