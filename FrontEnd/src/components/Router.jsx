import { BrowserRouter, Routes, Route } from "react-router-dom"
import ResponsiveAppBar from "../pages/Header"
import LoginPage from "../pages/Login"
import HomePage from "../pages/HomePage"

import AdminPage from "../pages/admin/Admin"
import SecretarioPage from "../pages/secretario/Secretario"

import AlumnoPage from "../pages/alumno/Alumno"
    import CursoAlumnoPage from "../pages/alumno/CursoControl"  
    
import ProfesorPage from "../pages/profesor/Profesor"
    import CursoProfesorPage from "../pages/profesor/CursoControl"
    import AlumnoControlPage from "../pages/profesor/AlumnoControl"


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ResponsiveAppBar />} >
                    <Route path="/" element= { <HomePage /> } />
                    <Route path="/login" element= { <LoginPage /> } />
                    <Route path="/inscripcion" element= { <HomePage /> } />                     
                </Route>
                    <Route path="/alumno" element= { <AlumnoPage/> } />
                        <Route path="/alumno/curso" element= { <CursoAlumnoPage /> } />
                    <Route path="/profesor" element= { <ProfesorPage /> } />
                        <Route path="/profesor/curso" element= { <CursoProfesorPage /> } />
                        <Route path="/profesor/curso/alumno" element= { <AlumnoControlPage /> } />
                    <Route path="/secretario" element= { <SecretarioPage /> } />
                        <Route path="/secretario/alumno/:id" element= { <SecretarioPage origen ={2}/> } />
                    <Route path="/admin" element= { <AdminPage /> } />
            </Routes>
        </BrowserRouter>
    )
}