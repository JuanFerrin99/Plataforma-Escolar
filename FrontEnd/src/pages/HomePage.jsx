import '../styles/HomePage.css';
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Carrusel from "../components/Carrusel"
export default function  Hub() {
    return (
        <body id="a">

            <div id="infoInicio">
            <h1>Instituto Manuel Savio</h1>
            <p>Carrera de Técnico Superior en electrónica</p>
            <p>Título Oficial de validez Nacional</p>
            <button>CARRERA</button>
            <button>CURSOS</button>
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



