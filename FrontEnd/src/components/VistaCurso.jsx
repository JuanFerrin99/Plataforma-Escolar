import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function VistaCurso() {
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