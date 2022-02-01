import React from 'react';
import { Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import MUIRichTextEditor from 'mui-rte';
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import './styles.css';
import {ContentState, convertToRaw} from 'draft-js';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

import { handle } from '../../utils/helpers';
import api from '../../redux/api';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

const AddBug = ({close, fetch, projectId}) => {
    const [cookies] = useCookies(['user']);
    const user = useSelector(state => state.authentication.user);

    const addBug = async objectToPost => {
        if (projectId && user && user.id) {
            const config = {
                headers: { Authorization: `Bearer ${cookies.user.token}` }
            }

            const [result, error] = await handle(api.post('bugs', {...objectToPost, createdBy: user.id, projectId: projectId}, config))

            console.log(result)
            console.log(error)

            if (!error) {
                fetch()
            }
        }
    }

    const [disabled, setDisabled] = React.useState(true);

    const [subject, setSubject] = React.useState("");
    const [testSteps, setTestSteps] = React.useState("");
    const [description, setDescription] = React.useState(JSON.stringify(convertToRaw(ContentState.createFromText(''))))
    const [plainDescription, setPlainDescription] = React.useState("");
    const [priority, setPriority] = React.useState("High")
    const [classification, setClassification] = React.useState("Functionality");
    const [assignee, setAssignee] = React.useState([]);
    const [tags, setTags] = React.useState("");
    const [status, setStatus] = React.useState("Open");
    const [severity, setSeverity] = React.useState("Minor");
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const descriptionRef = React.useRef();

    return (
        <Grid container justify="center" spacing={4}>
            <Grid item lg={10} xs={12}>
                <Grid container justify="flex-start">
                    <Typography variant="h5" style={{textDecoration: 'underline'}}>Add Bug</Typography>
                </Grid>
            </Grid>

            <Grid item lg={10} xs={12}>
                <TextField onChange={(event) => {
                    setDisabled(false)
                    setSubject(event.target.value)
                }} fullWidth label="Subject" variant="outlined" size="small" value={subject} />
            </Grid>

            <Grid item lg={10} xs={12} container>
                <Grid item lg={6} xs={12}>
                    <Typography variant="h6">Description</Typography>

                    <MUIRichTextEditor onChange={(state) => {
                        if (state.getCurrentContent().getPlainText() !== "") {
                            setDisabled(false)
                        }
                        
                        setDescription(JSON.stringify(convertToRaw(state.getCurrentContent())))
                        setPlainDescription(state.getCurrentContent().getPlainText())
                    }} label="Enter the bug description" controls={["bold", "italic", "underline", "quote", "clear"]} />
                </Grid>
            </Grid>

            <Grid item lg={10} xs={12} container>
                <Grid item lg={6} xs={12}>
                    <Typography variant="h6">Test Steps</Typography>
                    <Editor
                        textareaId="codeArea"
                        className="editor"
                        value={testSteps}
                        highlight={ code => 
                            highlight(code, languages.js).split('\n').map((line, i) => `<span class="editorLineNumber">${i+1}</span> ${line}`).join('\n')
                        }
                        style={{
                            fontFamily: 'Lato',
                            fontSize: 16
                        }}
                        onValueChange={(code) => {
                            setTestSteps(code)
                            setDisabled(false)
                        }}
                    />
                </Grid>
            </Grid>

            <Grid item lg={10} xs={12} container justify="space-between" spacing={2}>
                <Grid item>
                    <FormControl style={{minWidth: 120}}>
                        <InputLabel>Priority</InputLabel>
                        <Select value={priority} onChange={(event) => {
                            setDisabled(false)
                            setPriority(event.target.value)
                        }}>
                            <MenuItem value={"High"}>High</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Low"}>Low</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    {/* <TextField label="Classification" variant="outlined" size="small" value="Functionality" /> */}
                    <FormControl style={{minWidth: 120}}>
                        <InputLabel>Classification</InputLabel>
                        <Select value={classification} onChange={(event) => {
                            setDisabled(false)
                            setClassification(event.target.value)
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

            <Grid item lg={10} xs={12} container justify="space-between" spacing={2}>
                <Grid item>
                    <FormControl style={{minWidth: 120}}>
                        <InputLabel>Status</InputLabel>
                        <Select value={status} onChange={(event) => {
                            setDisabled(false)
                            setStatus(event.target.value)
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

                <Grid item>
                    {/* <TextField label="Classification" variant="outlined" size="small" value="Functionality" /> */}
                    <FormControl style={{minWidth: 120}}>
                        <InputLabel>Severity</InputLabel>
                        <Select value={severity} onChange={(event) => {
                            setDisabled(false)
                            setSeverity(event.target.value)
                        }}>
                            <MenuItem value={"Minor"}>Minor</MenuItem>
                            <MenuItem value={"Major"}>Major</MenuItem>
                            <MenuItem value={"Critical"}>Critical</MenuItem>
                            <MenuItem value={"Very Critical"}>Very Critical</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid item lg={10} xs={12} container justify="space-between" spacing={2}>
                <Grid item>
                    {/* <TextField label="Due Date" variant="outlined" size="small" /> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker format="dd/MM/yyyy" margin="normal" value={selectedDate} onChange={(date) => {
                            setSelectedDate(date)
                            setDisabled(false)
                        }} />
                    </MuiPickersUtilsProvider>
                </Grid>

                <Grid item>
                    <TextField onChange={(event) => {
                        setDisabled(false)
                        setAssignee(event.target.value === "" ? [] : event.target.value.split(","))
                    }} label="Assignee" variant="outlined" size="small" value={assignee} />
                </Grid>
            </Grid>

            <Grid item lg={10} xs={12} container justify="space-between" spacing={2}>
                <Grid item>
                    <TextField onChange={(event) => {
                        setDisabled(false)
                        setTags(event.target.value)
                    }} label="Tags" variant="outlined" size="small" value={tags} />
                </Grid>
            </Grid>

            <Grid item lg={10} xs={12} container justify="center" spacing={4}>
                <Grid item>
                    <Button variant="contained" color="primary" disabled={disabled} onClick={() => {
                        descriptionRef.current?.save();
                        const objectToPost = {
                            subject,
                            testSteps,
                            description,
                            priority,
                            classification,
                            assignee,
                            tags: tags === "" ? [] : tags.split(", "),
                            status,
                            severity,
                            plainDescription,
                            dueDate: selectedDate
                        }

                        addBug(objectToPost)

                        close()
                    }}>Submit</Button>
                </Grid>

                <Grid item>
                    <Button variant="contained" onClick={() => close()}>Cancel</Button>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default AddBug;