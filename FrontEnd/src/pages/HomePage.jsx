import '../styles/HomePage.css';
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Carrusel from "../components/Carrusel"
export default function  Hub() {
    return (
        <body id="a">
            <div id="infoInicio">

            <p>contactanos</p>

            </div>  

            <div id= "carrucel_div"><Carrusel /></div>
            <div id="contacto">

            <p>contactanos</p>

            </div>  
            <Container>
                <Outlet />
            </Container>
        </body>
    )
}



