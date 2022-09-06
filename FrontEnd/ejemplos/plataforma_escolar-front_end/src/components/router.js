import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alumno from "./Alumno";
import Alumnos from "./Alumnos";
import Home from "../pages/Home";
import Login from "./Login";
import MiAlumno from "./MiAlumno";
import MiContainer from "./MiContainer";

export default function MisRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/inscripcion' element={<Home />} />

                    <Route path='/alumno/:id' element={<Login />} />
                        <Route path='/alumno/:id/materias/:nombre' element={<Login />} />
                        <Route path='/alumno/:id/inscripcion' element={<Login />} />
                            <Route path='/alumno/:id/inscripcion/evaluacion' element={<Login />} />
                            <Route path='/alumno/:id/inscripcion/materia' element={<Login />} />

                    <Route path='/profesor/:id/asistencias' element={<Home />} />
                    <Route path='/profesor/:id/cursos' element={<Home />} />{/*o al apretar el boton de cursos solo cambia lo visual de /profesor/:id usando variable de ract con un if*/}
                        <Route path='/profesor/:id/cursos/:nombre' element={<Home />} />

                            <Route path='/profesor/:id/cursos/:nombre/asistecia' element={<Home />} />

                            <Route path='/profesor/:id/cursos/:nombre/alumnos' element={<Home />} />
                                <Route path='/profesor/:id/cursos/:nombre/alumnos/notas' element={<Home />} />
                                <Route path='/profesor/:id/cursos/:nombre/alumnos/asistencias' element={<Home />} />
                            
                            <Route path='/profesor/:id/cursos/:nombre/parciales' element={<Home />} />

                    <Route path='/secretario/:id' element={<Login />} />
                    <Route path='/admin/:id' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}