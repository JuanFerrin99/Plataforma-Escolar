import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Outlet } from "react-router-dom";
import Slide from '@mui/material/Slide';

const pages = [{"nombre":'Institucional',"camino":'/informacion'}, {"nombre":'Inscripcion',"camino":'/'}, {"nombre":"Carrera","camino":"/"}, {"nombre":'Cursos',"camino":'/'}, {"nombre":'Acceso',"camino":'/login'}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function ResponsiveAppBar () {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => { 
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);    
    window.location.href="/login";
    console.log(e)
  };
  
  const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

  return (
    <div>
        <div>
    <AppBar position="static" sx={{backgroundColor: "transparent", boxShadow:"none", position:"fixed"}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
        <img src="https://ise.com.ar/wp-content/uploads/2021/08/marca-ise-h-fb-2_.png" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}></img>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              float="right"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.nombre} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.nombre}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.nombre}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block'}}
              >
                {page.nombre}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
    <Container id="pd">
        <Outlet />
    </Container>
    </div>
  );
};




    