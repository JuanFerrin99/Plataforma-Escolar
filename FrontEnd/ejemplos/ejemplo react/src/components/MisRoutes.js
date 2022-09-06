import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alumno from "./Alumno";
import Alumnos from "./Alumnos";
import Home from "./Home";
import Login from "./Login";
import MiAlumno from "./MiAlumno";
import MiContainer from "./MiContainer";

export default function MisRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route element={<MiContainer />} >
                    <Route path='/alumnos' element={<Alumnos />} />
                    <Route path='/alumnos/miperfil' element={<MiAlumno />} />
                    <Route path='/alumnos/:id' element={<Alumno />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}