import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import Table from "../components/SecretarioComps/Table/Table"

export default function CursoCard({ id, materia }) {
    const location  = useLocation()
    const state = location.state.idCurso

    return (
        <div>
        <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
            Inscribirse final
        </Button>
        <Table/>
        <Table/>
    </div>
    );
}
