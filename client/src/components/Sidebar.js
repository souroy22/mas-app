import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { makeStyles,Drawer, Box, IconButton, Divider, Typography ,Grid } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from "react-router-dom";
import {setCurrentTab} from "../redux/actions"
import {useDispatch} from "react-redux"
import './side.css';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import PeopleIcon from '@mui/icons-material/People';


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
                    <AssignmentTurnedInRoundedIcon />
                </IconButton>
                <Typography onClick={()=>dispatch(setCurrentTab("MANAGER"))} className="mintext" >Manage</Typography>
                </Grid>

                <Divider />

                <Grid className="minbox2" onClick={()=>dispatch(setCurrentTab("AUTOMATE"))} >
                <IconButton>
                <ScreenSearchDesktopIcon />
                </IconButton > 
                     <Typography onClick={()=>dispatch(setCurrentTab("AUTOMATE"))} className="mintext" >Automate</Typography>
                </Grid>


                <Divider />

                <Grid className="minbox2" onClick={()=>dispatch(setCurrentTab("SUPPORT"))} >
                  <IconButton>
                <PeopleIcon />
                </IconButton>
                      <Typography onClick={()=>dispatch(setCurrentTab("SUPPORT"))} className="mintext" >Support</Typography>
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
