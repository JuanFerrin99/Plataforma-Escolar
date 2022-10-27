import * as React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import TableNotas from "../../components/tables/TableNotas/Table"
import TableFinales from "../../components/tables/TableFinales/Table"

export default function CursoCard() {
    const [notas, setNotas] = useState([]);
    const [finales, setFinales] = useState([]);
    const location = useLocation()
    const id = location.state.idCurso // id curso
    const dni = location.state.dni // dni alumno
    
    useEffect(() => {
            let tempNotas = []
            let p = ""
            fetch(`http://localhost:3001/cursos/${id}`, {credentials: "include"})
            .then(response => response.json())
            .then(curso => {
                setNotas([])
                setFinales(curso.finales)
                curso.alumnos.forEach((element, i) => {
                    if (element.dni === dni) {
                        tempNotas = [...notas, ...element.calificaciones]
                        setNotas(tempNotas.map((elem) => {
                            p = curso.evaluaciones.find(e => e.id === elem.id)
                            elem.fecha = p.fecha
                            elem.tipo = p.tipo
                            return elem
                        }))
                    }

                }
                )
            }
            )
            .catch(error => {
                console.log(error)
            })
        },[]);//todo si algun use effect se queda en loop infinito es por que tiene un setVar adentro cuando pasa eso hay que pasar un [] como segundo arg para que no se renderize despues de la primera ves

//? tuve que dejar table notas al principio porque es el unico que tiene el go back button cosa que habria que arreglar 
//todo el goBack boton deberia esta afuera de la table
    return (
        <div>
            <TableNotas notas={notas} idCurso={id} dniAlumno = {dni}/>
            <TableFinales finales={finales} idCurso={id} dniAlumno = {dni}/>
        </div>
    );
}

