import { Tab, makeStyles, Tabs, Grid, Drawer, Typography, Divider, AppBar, TextField } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import DescriptionPanel from './DescriptionPanel';
import TabPanel from './TabPanel';
import { useLocation, useNavigate } from 'react-router';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { useSelector } from 'react-redux'

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ffffff',
        display: 'flex',
        width: '100%',
        minHeight: '100vh'
    },
    drawerPaper: {
        width: 240,
        paddingTop: theme.spacing(3),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        backgroundColor: '#ffffff',
    },
    toolbar: theme.mixins.toolbar,
}))

const BugDetail = () => {
    const classes = useStyles();

    const { state } = useLocation();
    const navigate = useNavigate();
    const user = useSelector(state => state.authentication.user);
    let bug;

    if (state === null) {
        navigate('/');
    } else {
        bug = state;
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setDisabled(false)
        setValue(newValue)
    }
    
    const [priority, setPriority] = React.useState(bug.priority)
    const [classification, setClassification] = React.useState(bug.classification);
    const [assignee, setAssignee] = React.useState(bug.assignee);
    const [tags, setTags] = React.useState(bug.tags.join(', '));
    const [status, setStatus] = React.useState(bug.status);
    const [severity, setSeverity] = React.useState(bug.severity);
    const [selectedDate, setSelectedDate] = React.useState(bug.dueDate);
    const [loading, setLoading] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);

    const reset = () => {
        setPriority(bug.priority)
        setClassification(bug.classification)
        setAssignee(bug.assignee)
        setTags(bug.tags.join(', '))
        setStatus(bug.status)
        setSeverity(bug.severity)
        setSelectedDate(bug.dueDate)
        setDisabled(true)
    }
    

    const getObjectToPost = () => {
        return {
            id: bug.id,
            priority,
            classification,
            assignee: assignee,
            tags: tags === "" ? [] : tags.split(", "),
            status,
            severity,
            dueDate: selectedDate
        }
    }

    React.useEffect(() => {
        if (user && user.licenseInfo === "unpaid" && user.daysRemaining === null) {
            navigate("/")
        }
    }, [user])

    return (
        <Page className={classes.root} title="Bug Detail">

            <Backdrop style={{zIndex: 100, color: '#fff'}} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Drawer style={{zIndex: 3, width: 240, flexShrink: 0}} variant="permanent" anchor="left" classes={{paper: classes.drawerPaper}}>
                <div className={classes.toolbar} />
                <Typography variant="h4" align="center">{bug.id}</Typography>

                <Divider />

                <Grid container justify="center" style={{paddingTop: '20%'}} spacing={2}>
                    <Grid item xs={10}>
                        <TextField value={assignee.join(", ")} onChange={(event) => {
                            setAssignee(event.target.value.split(", "))
                            setDisabled(false)
                        }} variant="outlined" label="Assignee"></TextField>
                    </Grid>

                    <Grid item xs={10}>
                        <FormControl style={{minWidth: 180}}>
                            <InputLabel>Status</InputLabel>
                            <Select value={status} onChange={(event) => {
                                setStatus(event.target.value)
                                setDisabled(false)
                            }}>
                                <MenuItem value={"Open"}>Open</MenuItem>
                                <MenuItem value={"Closed"}>Closed</MenuItem>
                                <MenuItem value={"Can't Reproduce"}>Can't Reproduce</MenuItem>
                                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                <MenuItem value={"Fixed in Dev Setup"}>Fixed in Dev Setup</MenuItem>
                                <MenuItem value={"Verified"}>Verified</MenuItem>
                                <MenuItem value={"On Hold"}>On Hold</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={10}>
                        <FormControl style={{minWidth: 180}}>
                            <InputLabel>Severity</InputLabel>
                            <Select value={severity} onChange={(event) => {
                                setSeverity(event.target.value)
                                setDisabled(false)
                            }}>
                                <MenuItem value={"Minor"}>Minor</MenuItem>
                                <MenuItem value={"Major"}>Major</MenuItem>
                                <MenuItem value={"Critical"}>Critical</MenuItem>
                                <MenuItem value={"Very Critical"}>Very Critical</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={10}>
                        <TextField value={tags} onChange={(event) => {
                            setDisabled(false)
                            setTags(event.target.value)
                        }} variant="outlined" label="Tags"></TextField>
                    </Grid>

                    <Grid item xs={10}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker format="dd/MM/yyyy" margin="normal" value={selectedDate} onChange={(date) => {
                                setSelectedDate(date)
                                setDisabled(false)
                            }} />
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={10}>
                        <FormControl style={{minWidth: 180}}>
                            <InputLabel>Priority</InputLabel>
                            <Select value={priority} onChange={(event) => {
                                setPriority(event.target.value)
                                setDisabled(false)
                            }}>
                                <MenuItem value={"High"}>High</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={10}>
                        <FormControl style={{minWidth: 180}}>
                            <InputLabel>Classification</InputLabel>
                            <Select value={classification} onChange={(event) => {
                                setClassification(event.target.value)
                                setDisabled(false)
                            }}>
                                <MenuItem value={"High"}>API</MenuItem>
                                <MenuItem value={"UI"}>UI</MenuItem>
                                <MenuItem value={"Functionality"}>Functionality</MenuItem>
                                <MenuItem value={"Security"}>Security</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                
            </Drawer>

            <div className={classes.content}>
                <div className={classes.toolbar} />

                <Typography variant="h4" align="left" style={{paddingLeft: '5%'}}>{bug.subject}</Typography>

                <Divider />

                <AppBar position="static" color="#ffffff" elevation={0}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Details" {...a11yProps(0)} />
                        <Tab label="Attachments" {...a11yProps(0)} />
                        <Tab label="Timesheets" {...a11yProps(0)} />
                        <Tab label="History" {...a11yProps(0)} />
                    </Tabs>
                </AppBar>

                <TabPanel value={value} index={0}>
                    <DescriptionPanel disabled={disabled} setDisabled={setDisabled} setLoading={setLoading} reset={reset} getObjectToPost={getObjectToPost} description={bug.description} plainDescription={bug.plainDescription} testSteps={bug.testSteps} />
                </TabPanel>
            </div>
        </Page>
    )
}

export default BugDetail;