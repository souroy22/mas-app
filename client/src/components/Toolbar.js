import React from 'react';
import {
    Box,
    Button,
    makeStyles,
    Typography,
    Dialog,
    DialogContent,FormControl, InputLabel, Select,MenuItem, Grid
} from '@material-ui/core';
import AddBug from './AddBug';

const useStyles = makeStyles( theme => ({
    root: {
        overflowX: 'hidden',
        position:'relative'
    },
    projectName: {
        marginLeft: theme.spacing(1)
    },
    addButton: {
        marginRight: theme.spacing(1)
    }
}));

const Toolbar = ({handleChange, projects, selected, fetch}) => {
    const classes = useStyles();

    const [open,setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <Dialog onClose={() => setOpen(false)} open={open} fullWidth={true} maxWidth="lg">
                <DialogContent style={{ overflowX: 'hidden', zIndex: 2}}>
                    <AddBug fetch={fetch} projectId={selected < projects.length && projects[selected].id} close={() => setOpen(false)} />
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
                        Add Bug
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}


export default Toolbar;