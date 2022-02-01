import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import EditIcon from '@material-ui/icons/Edit';

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

import {ContentState, convertToRaw} from 'draft-js';
import { useCookies } from 'react-cookie';
import { handle } from '../../utils/helpers';
import api from '../../redux/api';

const DescriptionPanel = ({description, plainDescription, testSteps, reset , getObjectToPost, setLoading, disabled, setDisabled}) => {
    const [descriptionEnabled, setDescriptionEnabled] = React.useState(false);
    const [testStepsEnabled, setTestStepsEnabled] = React.useState(false);

    const [testStepsValue, setTestStepsValue] = React.useState("");
    const [descriptionValue, setDescriptionValue] = React.useState(description)
    const [plainDescriptionValue, setPlainDescriptionValue] = React.useState(plainDescription);

    React.useEffect(() => {
        setTestStepsValue(testSteps)
    }, [testSteps])

    const [cookies] = useCookies(['user']);

    const updateBug = async objectToPost => {
        const config = {
            headers: { Authorization: `Bearer ${cookies.user.token}` }
        }

        setLoading(true)
        const [result, error] = await handle(api.put(`bugs/${objectToPost.id}`, {...objectToPost}, config))
        setLoading(false)
        setDisabled(true)
    }

    const editorRef = React.useRef(null);

    return (
        <Grid item container justify="flex-start" spacing={4}>
            <Grid item xs={12} container>
                <Grid item xs={10}>
                    <Grid container justify="flex-start">
                        <Grid item>
                            <Typography variant="h5">Description</Typography>
                        </Grid>

                        <Grid item>
                            <IconButton onClick={() => setDescriptionEnabled(!descriptionEnabled)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>
                    
                </Grid>

                <Grid item xs={10} style={{width: '100%'}}>
                    <MUIRichTextEditor ref={editorRef} onChange={(state) => {
                        if (state.getCurrentContent().getPlainText() !== plainDescription) {
                            setDisabled(false)
                        } else {
                            setDisabled(true)
                        }
                        
                        setDescriptionValue(JSON.stringify(convertToRaw(state.getCurrentContent())))
                        setPlainDescriptionValue(state.getCurrentContent().getPlainText())
                    }} defaultValue={description} label="Enter the bug description" readOnly={!descriptionEnabled} />
                </Grid>
            </Grid>

            <Grid item xs={12} container>
                <Grid item xs={10} container justify="space-between">
                    <Grid item>
                        <Grid container justify="flex-start">
                            <Grid item>
                                <Typography variant="h5">Test Steps</Typography>
                            </Grid>

                            <Grid item>
                                <IconButton onClick={() => setTestStepsEnabled(!testStepsEnabled)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid item>
                        <Button variant="contained">Automate Test</Button>
                    </Grid>
                </Grid>

                <Grid item xs={10}>
                    <Editor
                        textareaId="codeArea"
                        className="editor"
                        value={testStepsValue}
                        highlight={ code =>
                            highlight(code, languages.js).split('\n').map((line, i) => `<span class="editorLineNumber">${i+1}</span> ${line}`).join('\n')
                        }
                        style={{
                            fontFamily: 'Lato',
                            fontSize: 16
                        }}
                        disabled={!testStepsEnabled}
                        onValueChange={(code) => {
                            setTestStepsValue(code)
                            setDisabled(false)
                        }}
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} container>
                <Grid item xs={10}>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="h5">Comments</Typography>
                        </Grid>

                        <Grid item>
                            <Button variant="contained">Add a comment</Button>
                        </Grid>
                    </Grid>
                    
                </Grid>

                <Grid item xs={10} style={{width: '100%'}}>
                    <MUIRichTextEditor label="Enter a comment" readOnly={!descriptionEnabled} />
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <Button disabled={disabled} variant="contained" color="primary" onClick={() => {
                            let objectToPost = getObjectToPost();
                            objectToPost = {
                                ...objectToPost,
                                description: descriptionValue,
                                testSteps: testStepsValue,
                                plainDescription: plainDescriptionValue
                            }
                            
                            updateBug(objectToPost)
                        }}>Submit</Button>
                    </Grid>
                    <Grid item>
                        <Button disabled={disabled} variant="contained" onClick={() => {
                            setDescriptionEnabled(false)
                            setTestStepsEnabled(false)

                            setTestStepsValue(testSteps)
                            setDescriptionValue(description)
                            setPlainDescriptionValue(plainDescription)

                            console.log(editorRef)

                            reset()
                        }}>Cancel</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DescriptionPanel;