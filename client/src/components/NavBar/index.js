import React from 'react';
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
        flexGrow: 1
    }
}))

export default function NavBar() {

    const [hide, setHide] = React.useState(false);

    const show = () => {
        setHide(!hide);
    }

    const handleClose = () => {
        setHide(false);
    }

    const classes = useStyles();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const dispatch = useDispatch();
    const { currentTab } = useSelector(state => state.currentTab);
    return (
        <div className={classes.root}>
            <AppBar position="absolute" style={{ paddingTop: 0 }}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title} onClick={() => navigate("/")}>
                        {currentTab}
                    </Typography>

                    {/* <IconButton color="inherit" onClick={() => {
                        removeCookie('user')
                        dispatch({type: USER_LOGOUT})
                    }}> */}
                    {/* <ExitToAppIcon />
                    </IconButton> */}


                    <IconButton onClick={show} aria-label="Avatar">
                        <StyledBadge color="primary">
                            {/* <ShoppingCartIcon /> */}
                            <Avatar p={3} >H</Avatar>
                        </StyledBadge>
                    </IconButton>

                    {hide ? <Box 
                        open={hide}
                        onClose={handleClose}
                        sx={{
                        width: '100%', maxWidth: 360,
                        position: 'absolute',
                        right: '1%',
                        top: '84%',
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
                                            <Avatar alt="H" 
                                            sx={{minWidth: "80px", minHeight: "80px",
                                            position: "relative",
                                            right: "10px"
                                            }}
                                            src="/static/images/avatar/1.jpg" className={classes.large} />
                                        </ListItemIcon>
                                        <Stack  direction="column">
                                        <Typography variant="h6">&nbsp;&nbsp;ABCDE</Typography>
                                        <ListItemText color="black" primary="&nbsp;&nbsp;abcd@gmail.com" />
                                        </Stack>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                        <Divider />
                        <nav aria-label="secondary mailbox folders">
                            <List>
                                <ListItem disablePadding>
                                    <Link to="/company/:id/Subscription" onClick={show} >
                                    <ListItemButton>
                                      <Typography variant='h6' textDecoration="none" >subscription type</Typography>
                                    </ListItemButton>
                                    </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                   <Link to="/company/:id/ReferAndEarn" onClick={show} >
                                    <ListItemButton component="a" href="#simple-list">
                                    <Typography variant='h6' textDecoration="none" >refer and earn</Typography>
                                    </ListItemButton>
                                    </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                <br></br>
                                <br></br>
                                &nbsp;&nbsp;&nbsp;&nbsp;<Button 
                                onClick={() => {
                                    removeCookie('user')
                                    dispatch({type: USER_LOGOUT})
                                }}
                                variant='secondry' style={{backgroundColor: "#0047AB",color: "white"}} >Log out</Button>
                                </ListItem>
                            </List>
                        </nav>
                    </Box> : null}
                </Toolbar>
            </AppBar>
        </div>
    )
}