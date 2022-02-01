import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { TextField, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Media from 'react-media';
import EmailIcon from '@mui/icons-material/Email';
// import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMediaQuery } from '@mui/material';




const styles = {
    Container: {
        background: 'Skyblue',
        backdropFilter: 'blur(40px)',
    },

    Container3: {
        border: "1px solid #000000",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
}
    
 

const Making = () => {

    const [box, setBox] = React.useState(false);

    const pop = () => {
        setBox(true);
    }

    const popdown = () => {
        setBox(false);
    }

    const mobile = useMediaQuery('(max-width: 480px)');

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


 
 return(
<Container style={styles.Container} maxWidth="100%" className="cofbackground" >
<Box sx={{
    display: "flex",
    flexDirection: "column",
    height: '100vh',
    alignItems: "center",
}} justifyContent="center">
     
        <Stack display="flex" direction="row" minWidth="80%" sx={{margin:"2% 0px"}} justifyContent="space-between">
        <button className='btn btn-primary btn-gradient'
            style={{
                minWidth: "30%",
                padding: '10px',
                borderRadius: "15px",
                opacity: "0"
            }} >Blank</button>
         <button className='btn btn-primary btn-gradient'
            style={{
                minWidth: "30%",
                padding: '10px',
                color: "white",
                backgroundColor: "#1A66CA",
                borderRadius: "15px"
            }} onClick={pop} >Add Use</button>
            </Stack>
     
     <Paper sx={{
     minHeight: "50%",
     minWidth: "80%"}}>
         hello
     </Paper>


</Box>
{box ? <Paper sx={{
    minWidth:"80%" ,
    minHeight:"60%" ,
    position: "fixed",
    top: '10%',
    left: "7%",
    borderRadius: '25px',
    flexDirection: "column",
    display: "flex",
    padding: "4% 4%",
}}>

<Stack spacing={3} >
<label>Name</label>
<TextField />
<label>Text Content</label>
<TextField multiline sx={{marginBottom:"30px"}} rows={5} />        


<Stack direction="row" >
<button className='btn btn-primary btn-gradient'
style={{
borderRadius: "82px",
minWidth: "30%",
margin: "5px auto",
padding: '10px',
backgroundColor: "#1A66CA",
color: "white"
}}>Submit</button>

<button className='btn btn-gradient'
style={{
borderRadius: "82px",
minWidth: "30%",
margin: "5px auto",
padding: '10px',
}} onClick={popdown} >Cancel</button>
</Stack>
</Stack>
</Paper>: null}
</Container>

 )
}

export default Making