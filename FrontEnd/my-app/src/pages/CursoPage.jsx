import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CursoPage from "../styles/CursoPage.css"
import Table from "../components/SecretarioComps/Table/Table"

export default function cursoCard({ id, materia }) {
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
