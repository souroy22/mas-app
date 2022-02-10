import { Box, Paper, Button, Card, Container, makeStyles, Backdrop, CircularProgress, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux'
import Toolbar from '../../components/Toolbar';
import Page from '../../components/Page';
import ReleaseNotes from '../../components/ReleaseNotes';
import api from '../../redux/api';
import { handle } from '../../utils/helpers';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { TextField, FormGroup, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import ProjectSideBar from '../../components/ProjectSideBar';
import Sidebar from '../../components/Sidebar';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../components/side.css';
import { Link } from 'react-router-dom';
import { style } from '@mui/system';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  
const styles = {
    Container: {
        backdropFilter: 'blur(40px)',
    },

    Container3: {
        border: "1px solid #000000",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        width: '100%',
        paddingRight: theme.spacing.unit * 7
    },
    toolbar: theme.mixins.toolbar,
}))

const ProjectPageBugs = props => {

      
    const [value, setValue] = React.useState(0);
  
    const handle2Change = (event, newValue) => {
      setValue(newValue);
    };

    const [box, setBox] = React.useState(false);

    const pop = () => {
        setBox(true);
    }

    const popdown = () => {
        setBox(false);
    }

    const classes = useStyles()

    const [on, setOn] = React.useState(false);

    const onclk = () => {
        setOn(!on);
    }

    const [projects, setProjects] = React.useState([]);
    const [bugs, setBugs] = React.useState([]);
    const [selected, setSelected] = React.useState(0);
    const params = useParams();
    const [cookies] = useCookies(['user']);
    const user = useSelector(state => state.authentication.user);
    const navigate = useNavigate();

    const fetchProjects = async () => {
        if (params.id) {
            const config = {
                headers: { Authorization: `Bearer ${cookies.user.token}` }
            }

            const [result, error] = await handle(api.get(`/project/${params.id}`, config))

            if (!error) {
                const projects = result.data
                setProjects(projects)
            }
        }
    }

    const fetchBugs = async () => {
        if (selected < projects.length) {
            if (projects[selected].id) {
                const config = {
                    headers: { Authorization: `Bearer ${cookies.user.token}` }
                }

                const [result, error] = await handle(api.get(`/bugs/${projects[selected].id}`, config))

                if (!error) {
                    const bugs = result.data
                    setBugs(bugs)
                }
            }
        }
    }

    React.useEffect(() => {
        fetchBugs()
    }, [selected, projects])

    const handleChange = event => {
        setSelected(event.target.value)
    }

    React.useEffect(() => {
        fetchProjects()
    }, [params])

    React.useEffect(() => {
        if (user && user.licenseInfo === "unpaid" && user.daysRemaining === null) {
            navigate("/")
        }
    }, [user])


    return (
        <div style={{ width: '100%' }}>
            <div className={classes.toolbar} />

            <Grid container justify="flex-start">
                <Grid item>
                    <ProjectSideBar fetch={fetchProjects} orientation="left" />
                </Grid>

                <Grid item xs={10}>
                    <Grid container justify="flex-end">
                        <Page className={classes.root} title="Bugs">

                            <Container style={styles.Container} maxWidth="100%" className="cofbackground" >
                            <Typography variant="h4"  style={{fontFamily: "arial"}}  >Settings</Typography>
                                <Box sx={{ width: '100%' }}>
                                    <Box style={{ borderBottom: 1, borderColor: 'divider', minWidth: "100%" , margin: "2% 0px", display: "flex", justifyContent: "space-evenly"}}>
                                        <Tabs value={value} onChange={handle2Change} aria-label="basic tabs example" style={{minWidth: "100%", display: "flex", justifyContent: "space-evenly"}}>     
                                            <Tab label="General Settings" {...a11yProps(0)} />
                                           <Tab label="App Settings" {...a11yProps(1)} />     
                                       </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                        <Stack direction="row">
                                    <Paper style={{maxWidth:"50%",margin: "2%", padding: "4%" }} >
                                        <Typography variant='h4' style={{margin:'auto', maxWidth: "max-content", textDecoration: "underline"}}>Organization</Typography>
                                        <Stack style={{margin: "2% 0%"}}>
                                         <Link to="/company/:id/Settings/SettingUser" className="mintext" > 
                                        <Typography variant='h6' ><li>User</li></Typography> 
                                        </Link>  
                                        <Link to="/company/:id/Settings/SettingCompany" className="mintext" > 
                                        <Typography variant='h6' ><li>Company</li></Typography> 
                                        </Link>
                                        </Stack>
                                    </Paper>   
                                    <Paper style={{maxWidth:"50%",margin: "2%", padding: "4%" }} >
                                        <Typography variant='h4' style={{margin:'auto', maxWidth: "max-content", textDecoration: "underline"}}>Organization</Typography>
                                        <Stack style={{margin: "2% 0%"}}>
                                        <Typography variant='h6' ></Typography> 
                                        </Stack>
                                    </Paper>   
                                    </Stack>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                    App Settings
                                    </TabPanel>
                                </Box>

                            </Container>

                        </Page>
                    </Grid>
                </Grid>

                <Grid item>
                    <Sidebar orientation="right" />
                </Grid>
            </Grid>
        </div>
    )
}

export default ProjectPageBugs;
