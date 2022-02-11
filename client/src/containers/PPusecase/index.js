import { Box, Paper, Container, makeStyles, Button, Grid } from '@material-ui/core';
import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Toolbar from '../../components/Toolbar';
import Modal from '@mui/material/Modal';
import Page from '../../components/Page';
import ReleaseNotes from '../../components/ReleaseNotes';
import api from '../../redux/api';
import { handle } from '../../utils/helpers';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ProjectSideBar from '../../components/ProjectSideBar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import USETitle from './USETitle';





const FirstName = React.createContext();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


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


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const config = {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWU1YTBhY2UwMWZkMzBlYzBiMGZjMjUiLCJpYXQiOjE2NDM2MDgwOTEsImV4cCI6MTY0NDIxMjg5MX0.evZcAfui0o2N4zPBhGK5iuRNQet_FrKO2hVfEzG6SiM`
        }
    }

    const handleChange2 = (name, value) => {
        if (name === 'useCaseDocumentName') {
            setUseCaseDocumentName(value)
        }
        else if (name === 'useCaseDocumentTextContent') {
            setUseCaseDocumentTextContent(value)
        }
    }


    const [getdata, setGetdata] = React.useState([]);

    const [useCaseDocumentName, setUseCaseDocumentName] = React.useState("")
    const [useCaseDocumentTextContent, setUseCaseDocumentTextContent] = React.useState("")


    const info = {
        useCaseDocumentName: useCaseDocumentName,
        useCaseDocumentTextContent: useCaseDocumentTextContent,
    }

    const details = {
        useCaseDocumentName: useCaseDocumentName,
        useCaseDocumentTextContent: useCaseDocumentTextContent,
    }

    const PutData = async (_id) => {
    const res = await axios.put(`http://localhost:3000/usecasedocument/${_id}`, details, config);
    GetData();
    handleClose();
    }

    const PostData = async () => {
        await axios.post(`http://localhost:3000/usecasedocument`, info, config);
        setBox(false);
        GetData();
    }

    const Ondelete = async (_id) => {
        console.log(_id)
        var zex = await axios.delete(`http://localhost:3000/usecasedocument/${_id}`, config);
        console.log(zex)
        GetData();
    }

    const GetData = async () => {
        const res = await axios.get(`http://localhost:3000/usecasedocument`, config);
        setGetdata(res.data.data);
        console.log(res);
    }

    useEffect(() => {
        GetData();
    }, [])

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
        <FirstName.Provider value={"hello world context api"} >
        <div style={{ width: '100%' }}>
            <div className={classes.toolbar} />

            <Grid container justify="flex-start">
                <Grid item>
                    <ProjectSideBar fetch={fetchProjects} orientation="left" />
                </Grid>

                <Grid item xs={10}>
                    <Grid container justify="flex-end">
                        <Page className={classes.root} title="Bugs">
                            {/* <Backdrop style={{zIndex: 100, color: '#fff'}} open={loading}>
                                <CircularProgress color="inherit" />
                            </Backdrop> */}

                            {/* <Container maxWidth={false}>
                                <Toolbar fetch={fetchBugs} projects={projects} handleChange={handleChange} selected={selected} />

                                <Box mt={3}>
                                     <ReleaseNotes bugs={bugs} />
                                </Box>
                            </Container> */}

                            <Container style={styles.Container} maxWidth="100%" className="cofbackground" >
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 'max-content',
                                    alignItems: "center",
                                }} justifyContent="center">

                                    <Stack display="flex" direction="row" minWidth="80%" sx={{ margin: "2% 0px" }} justifyContent="space-between">
                                        <Typography variant="h5" >Use Case Document</Typography>
                                        <button className='btn btn-primary btn-gradient'
                                            style={{
                                                minWidth: "15%",
                                                padding: '10px',
                                                color: "white",
                                                backgroundColor: "#0277bd",
                                                borderRadius: "5px",
                                                border: 'none',
                                            }} onClick={pop} >Add Use</button>
                                    </Stack>
                                    <TableContainer  component={Paper}>
                                        <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell style={{backgroundColor: "white", color: "black"}} >Name</StyledTableCell>
                                                    {/* <StyledTableCell align="right">Title</StyledTableCell> */}
                                                    <StyledTableCell align="right" style={{backgroundColor: "white", color: "black"}} >Edit</StyledTableCell>
                                                    <StyledTableCell align="right" style={{backgroundColor: "white", color: "black"}} >Delete</StyledTableCell>
                                                    {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>


                                                {getdata.map((value) => {
                                                    return (
                                                        <>
                                                            <StyledTableRow key={value._id}  >
                                                              
                                                                <StyledTableCell component="th" scope="row">

                                                                 <Link to="/company/:id/usecase/Title" >
                                                                    {value.useCaseDocumentName}
                                                                    </Link> 

                                                                </StyledTableCell>

                                                                {/* <StyledTableCell align="right">{value.useCaseDocumentTextContent}</StyledTableCell> */}
                 

                                                                <StyledTableCell align="right"><Button onClick={() => handleOpen(value._id)} >Edit</Button></StyledTableCell>
                                                               {open === true ? <Modal
                                                                    open={open}
                                                                    Backdrop={0}
                                                                    onClose={handleClose}
                                                                    aria-labelledby="parent-modal-title"
                                                                    key={value._id}
                                                                    aria-describedby="parent-modal-description"
                                                                    >
                                                                    <Paper style={{ ...style, minWidth: "80%", borderRadius: "25px", border: "none", minHeight: "70%", padding: "5% 5%" }}>
                                                                        <Stack spacing={3} >
                                                                            <label><b>Name</b></label>
                                                                            <TextField
                                                                                value={useCaseDocumentName}
                                                                                name="useCaseDocumentName"
                                                                                id="useCaseDocumentName"
                                                                                onChange={(e) => handleChange2('useCaseDocumentName', e.target.value)}
                                                                            />
                                                                            <label><b>Text Content</b></label>
                                                                            <TextField
                                                                                value={useCaseDocumentTextContent}
                                                                                name="useCaseDocumentTextContent"
                                                                                id="useCaseDocumentTextContent"
                                                                                key={value._id} 
                                                                                onChange={(e) => handleChange2('useCaseDocumentTextContent', e.target.value)}
                                                                                multiline
                                                                                sx={{ marginBottom: "30px" }}
                                                                                rows={5} />


                                                                            <Stack direction="row"  justifyContent="space-between">
                                                                                <button className='btn btn-primary btn-gradient'
                                                                                    style={{
                                                                                        borderRadius: "5px",
                                                                                        minWidth: "20%",
                                                                                        margin: "5px auto",
                                                                                        padding: '10px',
                                                                                        backgroundColor: "#1A66CA",
                                                                                        color: "white"
                                                                                    }}
                                                                                    onClick={() => PutData(value._id)}
                                                                                >Submit</button>

                                                                                <button className='btn btn-gradient'
                                                                                    style={{
                                                                                        borderRadius: "5px",
                                                                                        minWidth: "20%",
                                                                                        margin: "5px auto",
                                                                                        padding: '10px',
                                                                                    }}   onClick={handleClose} >Cancel</button>
                                                                            </Stack>
                                                                            </Stack>
                                                                    </Paper>
                                                                </Modal>: null}
                                                                <StyledTableCell align="right">
                                                                    <Button onClick={() => Ondelete(value._id)} >Delete</Button>
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        </>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                {box ? <Paper style={{
                                    minWidth: "100%",
                                    minHeight: "80%",
                                    position: "fixed",
                                    top: '10%',
                                    left: "0.5%",
                                    borderRadius: '5px',
                                    flexDirection: "column",
                                    display: "flex",
                                    padding: "4% 4%",
                                }}>

                                    <Stack spacing={3} >
                                        <label><b>Name</b></label>
                                        <TextField
                                            value={useCaseDocumentName}
                                            name="useCaseDocumentName"
                                            id="useCaseDocumentName"
                                            onChange={(e) => handleChange2('useCaseDocumentName', e.target.value)}
                                        />

                                        <label><b>Text Content</b></label>
                                        <TextField
                                            value={useCaseDocumentTextContent}
                                            name="useCaseDocumentTextContent"
                                            id="useCaseDocumentTextContent"
                                            onChange={(e) => handleChange2('useCaseDocumentTextContent', e.target.value)}
                                            multiline
                                            sx={{ marginBottom: "30px" }}
                                            rows={5} />


                                        <Stack direction="row" >
                                            <button className='btn btn-primary btn-gradient'
                                                style={{
                                                    borderRadius: "5px",
                                                    minWidth: "20%",
                                                    margin: "5px auto",
                                                    padding: '10px',
                                                    backgroundColor: "#1A66CA",
                                                    color: "white"
                                                }}
                                                onClick={PostData}
                                            >Submit</button>

                                            <button className='btn btn-gradient'
                                                style={{
                                                    borderRadius: "5px",
                                                    minWidth: "20%",
                                                    margin: "5px auto",
                                                    padding: '10px',
                                                }} onClick={popdown} >Cancel</button>
                                        </Stack>
                                    </Stack>
                                </Paper> : null}
                            </Container>

                        </Page>
                    </Grid>
                </Grid>

                <Grid item>
                    <Sidebar orientation="right" />
                </Grid>
            </Grid>
        </div>
        </FirstName.Provider>
    )
}

export default ProjectPageBugs;
export {FirstName};
