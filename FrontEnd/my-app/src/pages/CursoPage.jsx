import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CursoPage from "../styles/CursoPage"

export default function cursoCard({ id, materia }) {
    return (
        <div>
        <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
            Inscribirse materia
        </Button>
        <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
            Inscribirse materia
        </Button>
        <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
            Inscribirse materia
        </Button>
    </div>
    );
}
