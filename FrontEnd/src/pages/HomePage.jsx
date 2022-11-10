import '../styles/pages/HomePage.css';
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Carrusel from "../components/home/Carrusel"

export default function Hub() {
    return (
        <body id="a">

            <div id="infoInicio">
                <h1>Instituto Manuel Savio</h1>
                <p>Carrera de Técnico Superior en electrónica</p>
                <p>Título Oficial de validez Nacional</p>
                <a href='/carrera'><button>CARRERA</button></a>
                <a href='/cursos'><button>CURSOS</button></a>
            </div>
            
            <div id="carrucel_div"><Carrusel /></div>
            <div id="contacto">
                <div id="info">
                    <h1>Contactate con<br />
                    nosotros</h1>
                    <p> mail<br/>
                    info@ise.com.ar<br/>
                    telefono<br/>
                    +54 9 11 3611-7780</p>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13132.78512711098!2d-58.4503281!3d-34.6244798!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7b474047508c8258!2sInstituto%20Superior%20de%20Electr%C3%B3nica%20Manuel%20Savio!5e0!3m2!1ses-419!2sar!4v1666024268209!5m2!1ses-419!2sar&zoom=21”" allowFullScreen=""loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicacion instituto"></iframe>
            </div>
            <Container>
                <Outlet />
            </Container>
        </body>
    )
}