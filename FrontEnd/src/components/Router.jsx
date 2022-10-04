import { BrowserRouter, Routes, Route } from "react-router-dom"
import ResponsiveAppBar from "../pages/Header"
import HomePage from "../pages/HomePage"
import AlumnoPage from "../pages/AlumnoPage"
import ProfesorPage from "../pages/ProfesorPage"
import SecretarioPage from "../pages/SecretarioPage"
import AdminPage from "../pages/AdminPage"
import CursoAlumnoPage from "../pages/CursoAlumnoPage"
import CursoProfesorPage from "../pages/CursoProfesorPage"
import AlumnoControlPage from "../pages/AlumnoControlPage"
import LoginPage from "../pages/LoginPage"


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
                    <Route path="/admin" element= { <AdminPage /> } />
            </Routes>
        </BrowserRouter>
    )
}