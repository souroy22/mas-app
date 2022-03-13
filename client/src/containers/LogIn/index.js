import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

const Signin = () => {
  const handleSubmit = async (event) => {
    try {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            useremail: formData.get('email_username'),
            password: formData.get('password')
        }
        const response = await axios.post('http://localhost:8000/api/auth/signin', data);
        console.log("Response", response);
    } catch (error) {
        console.log("Error while sign up", error.message);
    }
  };

  return (
      <div style={{marginTop: '5%', width: '100%'}}>
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="username / email"
                    name="email_username"
                    autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Login
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/signup" variant="body2">
                        do not have any account? signup
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    </div>
  );
}

export default Signin;