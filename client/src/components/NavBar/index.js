import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from "react-redux"
import { USER_LOGOUT } from '../../utils/constants';
import CurrentTab from '../../redux/reducers/SetCurrentTab';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Stack from '@mui/material/Stack'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '@mui/material/Modal';


const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);


const useStyles = makeStyles((them) => ({
    root: {
        flexGrow: 1,
        zIndex: 4
    },
    title: {
        flexGrow: 1,
        fontFamily: "arial"
    }
}))

export default function NavBar() {

    

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
     const handleClose = () => {
         setOpen(false);
     };


    const [user_name, setUserName] = React.useState("");
    const [user_email, setUserEmail] = React.useState("");
    const [reload, setReload] = React.useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
     useEffect(() => {
        if(cookies && cookies?.user){
            const {user_name, user_email} = cookies.user;
            setUserName(user_name);
            setUserEmail(user_email);
            setReload(!reload);
        }
     }, [user_name, reload, cookies, user_email]);


   

    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentTab } = useSelector(state => state.currentTab);

    return (
        <div className={classes.root}>
            <AppBar position="absolute" style={{ paddingTop: 0, backgroundColor: '#212121' }}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title} onClick={() => navigate("/")}>
                        {currentTab}
                    </Typography>

                    {user_name && <IconButton onClick={handleOpen} aria-label="Avatar">
                        <StyledBadge color="primary">
                            {/* <ShoppingCartIcon /> */}
                            <Avatar p={3} >{user_name.slice(0, 1)}</Avatar>
                        </StyledBadge>
                    </IconButton>}
                    {open === true ? <Modal
                        open={open}
                        Backdrop={0}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                       
                        aria-describedby="parent-modal-description"
                    >
                        
                <Box
                    
                    sx={{
                        width: '100%', maxWidth: 360,
                        position: 'absolute',
                        right: '1%',
                        top: '8%',
                        color: "black",
                        bgcolor: 'background.paper',
                        borderRadius: "25px",
                        padding: "2%",
                        boxShadow: 2
                    }}>
                    <nav aria-label="main mailbox folders">
                        <List   >
                            <ListItem disablePadding>
                                <Typography variant="h5"><b> &nbsp;&nbsp;Personal</b></Typography>
                            </ListItem>
                            <br></br>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Avatar alt={user_name.slice(0, 1)}
                                            sx={{
                                                minWidth: "80px", minHeight: "80px",
                                                position: "relative",
                                                right: "10px"
                                            }}
                                            src="/static/images/avatar/1.jpg" className={classes.large} />
                                    </ListItemIcon>
                                    <Stack direction="column">
                                        <Typography variant="h6">&nbsp;&nbsp;{user_name}</Typography>
                                        <ListItemText color="black" primary={`${user_email}`} />
                                    </Stack>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                    <Divider />
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <Link to="/company/:id/HelpDocs" style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    <ListItemButton>
                                        <Typography variant='h6' textDecoration="none" >Help Docs</Typography>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                          
                                
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <Typography variant='h6' textDecoration="none" >Contact Us</Typography>
                                </ListItemButton>
                            </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <Typography variant='h6' textDecoration="none" >
                                         subscription
                                        </Typography>
                                    </ListItemButton>
                                </ListItem>

                           
                            <ListItem disablePadding>
                                <Link to="/company/:id/ReferAndEarn" style={{
                                    textDecoration: "none",
                                    color: "black"
                                }} >
                                    <ListItemButton component="a" href="#simple-list">
                                        <Typography variant='h6' textDecoration="none" >Refer and Earn</Typography>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem disablePadding>
                                <br></br>
                                <br></br>
                                &nbsp;&nbsp;&nbsp;&nbsp;<Button
                                    onClick={() => {
                                        removeCookie('user')
                                        dispatch({ type: USER_LOGOUT });
                                        window.location.reload();
                                    }}
                                    variant='secondry' style={{ backgroundColor: "#0047AB", color: "white" }} >Log out</Button>
                            </ListItem>
                        </List>
                    </nav>
                </Box> 
                       
                    </Modal> : null}

                </Toolbar>
            </AppBar>
        </div>
    )
}