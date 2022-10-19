import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isLogged } from "../utils/cookieUtils";

export default function MiContainer() {

    const isLoggedIn = isLogged()
    const location = useLocation()

    if(!isLoggedIn)
        return <Navigate to="/login" state={{paginaAnterior: location}} replace />

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" component="div">
                            Estás viendo la pagina
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <br />
            <Container>
                <Outlet />
            </Container>
        </div>
    )

}