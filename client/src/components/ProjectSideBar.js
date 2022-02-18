import React,{ useState } from 'react';
import { makeStyles,Drawer, Divider, IconButton, Grid, Typography, Dialog, DialogTitle, TextField, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { handle } from '../utils/helpers';
import api from '../redux/api';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import {useDispatch,useSelector} from "react-redux"
import Popover from '@mui/material/Popover';
import PPDocs from '../containers/PPDocs';
import './side.css';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BugReportIcon from '@mui/icons-material/BugReport';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArticleIcon from '@mui/icons-material/Article';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SecurityIcon from '@mui/icons-material/Security';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PublicIcon from '@mui/icons-material/Public';



const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex: 3,
        position: 'relative',
        flexShrink: 0,
        width: 100
    },
    toolbar: theme.mixins.toolbar,
    paper: {
        width: 100,
        overflow: "hidden",
    }
}))

const ProjectSideBar = ({orientation, fetch}) => {

     const [anchorEl, setAnchorEl] = React.useState(null);

     const uphandleClick = (event) => {
       setAnchorEl(event.currentTarget);
     };
  
    const uphandleClose = () => {
      setAnchorEl(null);
    };
  
    const upopen = Boolean(anchorEl);
    const id = upopen ? 'simple-popover' : undefined;

    const dispatch = useDispatch();
    const {currentTab} = useSelector(state=>state.currentTab);
    const classes = useStyles();
    const params = useParams();
    const [cookies] = useCookies(['user']);

    // const [projects, setProjects] = React.useState([
    //     {projectName: "Docs"},
    //     {projectName: "Tasks"},
    //     {projectName: "Bugs"},
    // ]);

    const [projects, setProjects] = React.useState(true);
    const drop = () => {
        setProjects(!projects);
    }

    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, formState: {errors},reset, control} = useForm();
    const [createErros, setErrors] = React.useState(false);
    const user = useSelector(state => state.authentication.user);

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

    const createProject = async ({projectName, projectDescription}) => {

      


        if (params.id && user && user.id) {
            const config = {
                headers: { Authorization: `Bearer ${cookies.user.token}` }
            }

            const [result,error] = await handle(api.post(`/project`, {
                projectName,
                description: projectDescription,
                createdBy: user.id,
                companyId: params.id
            }, config))

            if (!error) {
                await fetchProjects();
                await fetch();
                setOpen(false)
                setErrors(false)
            } else {
                setErrors(true)
            }
        }
    }

    const handleClose = () => {
        setOpen(false)
        setErrors(false)
    };

    React.useEffect(() => {
        fetchProjects()
    }, [params])

    const onSubmit = data => {
        createProject(data)
        reset()
    }

    return (
        <Drawer classes={{ paper: classes.paper }} variant="permanent" anchor={orientation} className={classes.drawer}>
            <div className={classes.toolbar} />

            <Dialog onClose={handleClose} open={open} fullWidth style={{overflow: 'hidden'}}>
                <DialogTitle>Add a Project</DialogTitle>

                <Grid container justify="center" style={{overflow: 'hidden'}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container justify="center" spacing={2} style={{marginTop: '1%'}}>
                            {
                                createErros && (
                                    <Grid item xs={12} container justify="center">
                                        <Alert severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            Project name is already taken or server error.
                                        </Alert>
                                    </Grid>
                                )
                            }

                            <Grid item xs={12} container justify="center">
                                <TextField id="projectName" {...register("projectName", {
                                    required: "Project Name is required"
                                })} error={("projectName" in errors)} helperText={"projectName" in errors && errors.projectName.message} label="Project Name" variant="outlined" />
                            </Grid>

                            <Grid item xs={12} container justify="center">
                                <TextField id="projectDescription" multiline {...register("projectDescription")} error={("projectDescription" in errors)} helperText={"projectDescription" in errors && errors.projectDescription.message} label="Project Description" variant="outlined" />
                            </Grid>

                            <Grid item xs={12} container justify="center">
                                <Button variant="contained" color="primary" type="submit" disabled={Object.keys(errors).length > 0}>Submit</Button>
                            </Grid>

                            <Grid item></Grid>
                        </Grid>
                    </form>
                </Grid>
            </Dialog>

            <Grid container justify="center" spacing={2}>
                <Grid item xs={11}>
                    <Grid container justify="space-between" flexDirection="column" alignItems="center" style={{paddingTop: "50%", justifyContent: "center"}}>
                        <Grid item>
                            <Typography style={{fontSize: '18px'}} align="center">Projects</Typography>
                        </Grid>
                        
                        <Grid item>
                            <IconButton onClick={() => setOpen(true)}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider />

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                {/* {
                    projects.map(v => (
                        ))
                    } */}

                        <Stack direction="column" style={{minWidth: "100%"}} >
                     
                       {currentTab === "MANAGER" && <Grid item xs={10} className="minbox" style={{display:"flex",flexDirection: "column", alignItems:"center", justifyContent:"flex-start"}}> 
                               <IconButton>
                               <ArticleIcon />
                               </IconButton>
                               <Link to="/company/:id/Docs" className="mintext">
                            <Typography className="mintext">Docs</Typography>
                            </Link>            

                       {/* <Button aria-describedby={id} variant="contained" > */}
                       {/* Open Popover
                       </Button> */}
                       {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}

                        </Grid>}
                  
                        <Popover
                            id={id}
                            open={upopen}
                            anchorEl={anchorEl}
                         
                            onClose={uphandleClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                          >

                        </Popover> 
                        {currentTab === "MANAGER" &&  <Link to="/company/:id/Tasks" className="mintext" >
                        <Grid item xs={10}  className="minbox"  style={{display:"flex",flexDirection: "column", alignItems:"center", justifyContent:"flex-start"}}> 
                               <IconButton>
                               <TaskAltIcon /> 
                               </IconButton>
                               <Typography className="mintext" >Tasks</Typography>
                        </Grid>
                        </Link>}

                       
                        {currentTab === "MANAGER" &&  <Link to="/company/:id/Bugs" className="mintext"  >
                         <Grid item xs={10}  className="minbox"  style={{display:"flex", alignItems:"center",flexDirection: "column", justifyContent:"flex-start"}}>
                               <IconButton>
                               <BugReportIcon /> 
                               </IconButton>
                            <Typography className="mintext" style={{textDecoration: "none"}} >Bugs</Typography>
                            </Grid>
                        </Link>}
                       
                         

                        {currentTab === "AUTOMATE" &&  <Link to="/company/:id/tests" className="mintext"  >
                         <Grid item xs={10} className="minbox" style={{display:"flex", alignItems:"center",flexDirection: "column", justifyContent:"flex-start"}}> 
                               <IconButton>
                               <ArticleIcon /> 
                               </IconButton>
                            <Typography className="mintext">Test</Typography>
                        </Grid>
                        </Link>}
                        {currentTab === "AUTOMATE" &&  <Link to="/company/:id/Report" className="mintext"  >
                         <Grid item xs={10} className="minbox" style={{display:"flex", alignItems:"center",flexDirection: "column", justifyContent:"flex-start"}}> 
                               <IconButton>
                               <PublishedWithChangesIcon /> 
                               </IconButton>
                            <Typography className="mintext" > Run</Typography>
                        </Grid>
                        </Link>}
                        {currentTab === "AUTOMATE" &&  <Link to="/company/:id/Report" className="mintext" >
                         <Grid item xs={10} className="minbox" style={{display:"flex", alignItems:"center",flexDirection: "column", justifyContent:"flex-start"}}> 
                               <IconButton>
                               <SecurityIcon /> 
                               </IconButton>
                            <Typography className="mintext">Tools</Typography>
                        </Grid>
                        </Link>}
                       
                        {currentTab === "SUPPORT" &&  <Link to="/company/:id/Tickets" className="mintext" >
                         <Grid item xs={10} className="minbox" style={{display:"flex", alignItems:"center",flexDirection: "column", justifyContent:"flex-start"}}> 
                               <IconButton>
                               <ConfirmationNumberIcon /> 
                               </IconButton>
                            <Typography className="mintext">Tickets</Typography>
                        </Grid>
                        </Link>}
                        {currentTab === "SUPPORT" &&  <Link to="/company/:id/Social" className="mintext" >
                         <Grid item xs={10} className="minbox" style={{display:"flex", alignItems:"center",flexDirection: "column", justifyContent:"flex-start"}}> 
                               <IconButton>
                               <PublicIcon /> 
                               </IconButton>
                            <Typography className="mintext">Social</Typography>
                        </Grid>
                        </Link>}
                        <Link to="/company/:id/Report" className="mintext" >
                         <Grid item xs={10} className="minbox" className="minbox"  style={{display:"flex", alignItems:"center",flexDirection: "column", justifyContent:"flex-start"}}> 
                               <IconButton>
                               <AssessmentIcon /> 
                               </IconButton>
                            <Typography className="mintext">Reports</Typography>
                        </Grid>
                        </Link>
                        </Stack>
  
            </Grid>
        </Drawer>
    )
}


export default ProjectSideBar;