//import '../styles/paginas/HomePage.css';
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ManageAccounts } from '@mui/icons-material';

export default function  Hub() {
    return (
        <body> 
            <button></button>
            <Container>
                <Outlet />
            </Container>
        </body>
    )
}



