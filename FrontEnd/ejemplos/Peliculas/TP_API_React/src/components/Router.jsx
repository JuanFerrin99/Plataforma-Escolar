import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Header from "./Header"
import Peliculas from "../pages/Peliculas"
import Pelicula from "../pages/Pelicula"
import Delete from "../pages/Delete"
import AñadirComentario from "./Comentarios"
import Filtro from "../pages/Filtro"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<Header titulo="Peliculas" />} >
                    <Route path="/" element={<Peliculas />} />
                    <Route path="/:id" element={<Pelicula />} />
                    <Route path="/delete/:id" element={<Delete />} /> {/* // funcion en peliculas */}
                     <Route path="/:id/comentarios" element={<AñadirComentario />} /> {/* // funcion en peliculas */}
                    <Route path="/filtro" element={<Filtro />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
