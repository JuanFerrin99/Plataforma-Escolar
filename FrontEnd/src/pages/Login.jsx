import * as React from 'react';
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pressed, setPressed] = useState(false);


    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin()
    }
    const handleEnviarReset = (event) => {
        event.preventDefault();
        handleResetPassword()
        window.location.href = '/login'
    }

    const handleLogin = () => {
        const body = {
            email: email,
            password: password
        }

        const options = {
            withCredentials: true
        }

        axios.post("http://localhost:3001/login", body, options)
            .then(jwt => {
                window.location.href = `/${Cookies.get("rol")}`
            })
            .catch(e => console.log(e + "daw"));
    }
    const handleResetPassword = () => {
        const options = {
            withCredentials: true
        }

        axios.post("http://localhost:3001/login/password/reset", { email: email }, options)
            .then(jwt => {
            })
            .catch(e => console.log(e + "daw"));
    }

    function cambiarContraseña(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                <button onClick={() => {
                    setPressed(true)
                }}>
                    Restabler contraseña
                </button>
            </Typography>
        );
    }

    if (pressed === false) {
        return (
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
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                onChange={handleEmailChange}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={handlePasswordChange}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                    {cambiarContraseña()}
                </Container>
            </ThemeProvider>
        );
    }
    else {
        return (
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
                            Ingrese su mail
                        </Typography>
                        <Box component="form" onSubmit={handleEnviarReset} noValidate sx={{ mt: 1 }}>
                            <TextField
                                onChange={handleEmailChange}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Enviar
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        )
    }
}
