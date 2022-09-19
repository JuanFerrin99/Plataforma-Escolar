//import '../styles/paginas/HomePage.css';
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Carrusel from "../components/Carrusel"
export default function  Hub() {
    return (
        <body id="a">
            <p>hay que guardar el mail en algunn lgar que no se cambiable por el usuario y hay que proteger ciertas urls de ciertos usuarios</p>
            <img src="https://images.unsplash.com/photo-1626593261859-4fe4865d8cb1?ixlib=rb-1.2.1ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8MTYlM0E5fGVufDB8fDB8fA%3D%3Dw=1000q=80" alt="" width="100%" height="50%" id='imagen'/>
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



