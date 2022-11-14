import * as React from 'react';
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import '../styles/pages/HomePage.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { fetchPost } from '../components/utils/Fetch';
import '../styles/pages/Login.css';
import { borders } from '@mui/system';



export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pressed, setPressed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);


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

        fetchPost(`login`, body)
            .then(res => {
                document.cookie = `mail = ${body.email}`
                document.cookie =  `rol = ${res.rol}`

                window.location.href = `/${Cookies.get("rol")}`
            })
            .catch(e => { alert("Error en los datos") });
    }
    const handleResetPassword = () => {
        fetchPost(`login/password/reset/`, { email: email })
            .then(jwt => {
            })
            .catch(e => console.log(e));
    }

    function cambiarContraseña() {
        return (
            <Button variant="text" fullWidth sx={{color:"info", fontSize:10}}
            onClick={() => {
                setPressed(true)
            }}>
                Restablecer contraseña
            </Button>

        );
    }

    if (pressed === false) {
        return (
            <div class="login">
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
                        <Avatar sx={{ m: 1, bgcolor: '#ffaf01 ' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{color:"#FAFAFA"}}>
                            Inicar sesión
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField sx={{ '& .MuiInput-underline:before': { borderBottomColor: '#FAFAFA' }, '& .MuiInput-underline:after': { borderBottomColor: 'info' }, input: { color: '#F2F3F4' }, label: { color: '#FAFAFA' } }} 
                                onChange={handleEmailChange}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                variant='standard'
                                color='info'
                                autoFocus
                            />
                            <TextField  sx={{ '& .MuiInput-underline:before': { borderBottomColor: '#FAFAFA' }, '& .MuiInput-underline:after': { borderBottomColor: 'info' }, input: { color: '#F2F3F4' }, label: { color: '#FAFAFA' } }} 
                                onChange={handlePasswordChange}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                id="password"
                                variant='standard'
                                color='info'
                                autoFocus
                                autoComplete="current-password"

                                type={showPassword ? "text" : "password"} 

                                InputProps={{ 
                                    endAdornment: (
                                        <InputAdornment position="end" color='#FAFAFA'>
                                            <IconButton   
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityIcon sx={{color:"#fafafa"}}/> : <VisibilityOffIcon sx={{color:"#fafafa"}}/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Ingresar
                            </Button>
                        </Box>
                    </Box>
                    {cambiarContraseña()}
                </Container>
            </div>
        );
    }
    else {
        return (
            <div class="login">
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
                        <Avatar sx={{ m: 1, bgcolor: '#ffaf01 '  }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{color:"#FAFAFA"}}>
                            Ingrese su mail
                        </Typography>
                        <Box component="form" onSubmit={handleEnviarReset} noValidate sx={{ mt: 1 }}>
                            <TextField sx={{ '& .MuiInput-underline:before': { borderBottomColor: '#FAFAFA' }, '& .MuiInput-underline:after': { borderBottomColor: 'info' }, input: { color: '#F2F3F4' }, label: { color: '#FAFAFA' } }} 
                                onChange={handleEmailChange}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                variant='standard'
                                color='info'
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
            </div>
        )
    }
}
