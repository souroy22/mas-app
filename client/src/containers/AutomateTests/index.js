import { Box, Container, makeStyles, Backdrop, CircularProgress, FormControl, InputLabel, Select,MenuItem, Grid  } from '@material-ui/core';
import {
    Button,
    Typography,
    Dialog,
    DialogContent } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux'
//import Toolbar from '../../components/Toolbar';
import Page from '../../components/Page';
import Tests from '../../components/Tests/Tests';
import AddTest from '../../components/Tests/AddTest';
import api from '../../redux/api';
import { handle } from '../../utils/helpers';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import ProjectSideBar from '../../components/ProjectSideBar';
import Sidebar from '../../components/Sidebar';


//Toolbar code from components folder copied and pasted
//Css were not fully copied toolbar component(need to add root style)!

const Toolbar = ({handleChange, projects, selected, fetch}) => {
    const classes = useStyles();

    const [open,setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <Dialog onClose={() => setOpen(false)} open={open} fullWidth={true} maxWidth="lg">
                <DialogContent style={{ overflowX: 'hidden', zIndex: 2}}>
                    <AddTest fetch={fetch} projectId={selected < projects.length && projects[selected].id} close={() => setOpen(false)} />
                </DialogContent>
            </Dialog>

            <Grid container justify="space-between">
                <Grid item xs={1}>
                    <Grid container justify="flex-start">
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <Select
                                    value={selected}
                                    onChange={handleChange}
                                >
                                    {
                                        projects.map((v,i) => (
                                            <MenuItem value={i}>{v.projectName}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setOpen(true)}
                    >
                        Add Test
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        width: '100%',
        paddingRight: theme.spacing.unit * 7
    },
    projectName: {
        marginLeft: theme.spacing(1)
    },
    addButton: {
        marginRight: theme.spacing(1)
    },
    toolbar: theme.mixins.toolbar,
}))

const AutomateTests = props => {
    const classes = useStyles()
   
    const [on, setOn] = React.useState(false);
    
    const onclk = ( ) => {
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
    
            const [result,error] = await handle(api.get(`/project/${params.id}`, config))

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
        
                const [result,error] = await handle(api.get(`/bugs/${projects[selected].id}`, config))
    
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
        <div style={{width: '100%'}}>
            <div className={classes.toolbar} />

            <Grid container justify="flex-start">
                <Grid item>
                     <ProjectSideBar fetch={fetchProjects} orientation="left" /> 
                </Grid>

                <Grid item xs={10}>
                    <Grid container justify="flex-end">
                        <Page className={classes.root} title="Tests">
                            {/* <Backdrop style={{zIndex: 100, color: '#fff'}} open={loading}>
                                <CircularProgress color="inherit" />
                            </Backdrop> */}
                            
                            <Container maxWidth={false}>
                                <Toolbar fetch={fetchBugs} projects={projects} handleChange={handleChange} selected={selected} />

                                <Box mt={3}>
                                     <Tests bugs={bugs} />
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

export default AutomateTests;
