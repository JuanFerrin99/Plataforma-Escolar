import { BrowserRouter, Routes, Route } from "react-router-dom"
import ResponsiveAppBar from "../pages/Header"
import HomePage from "../pages/HomePage"
import AlumnoPage from "../pages/AlumnoPage"
import ProfesorPage from "../pages/ProfesorPage"
import SecretarioPage from "../pages/SecretarioPage"
import AdminPage from "../pages/AdminPage"
import CursoPage from "../pages/CursoPage"
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
                    <Route path="/alumno" element= { <AlumnoPage mail = "mailRecibido"/> } />
                        <Route path="/alumno/curso" element= { <CursoPage /> } />
                    <Route path="/profesor" element= { <ProfesorPage /> } />
                    <Route path="/secretario" element= { <SecretarioPage /> } />
                    <Route path="/admin" element= { <AdminPage /> } />
            </Routes>
        </BrowserRouter>
    )
}