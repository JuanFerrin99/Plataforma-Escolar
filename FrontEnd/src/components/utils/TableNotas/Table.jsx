import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import "./Table.css";

const makeStyle = (status) => {
    if (status === 'Approved') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
        }
    }
    else if (status === 'Pending') {
        return {
            background: '#ffadad8f',
            color: 'red',
        }
    }
    else {
        return {
            background: '#59bfff',
            color: 'white',
        }
    }
}

export default function BasicTable(props) {
    const [notas, setNotas] = useState([]);
	const [s, setS] = useState(true);
	useEffect(() => {
		if(s){//toDO checkear que si no hay notas que no se quede cargando infinitamente y consuma mucho
			setNotas(getArray(props))
			if(notas.length == 0){return undefined}
			else{setS(false)}
		}
	});

	const handleDelete = (postIndex) => {
        fetch("http://localhost:3001/inasistencias/", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
		setNotas(prevPosts =>prevPosts.filter((_, index) => index !== postIndex))
	}
	
    function getArray(p) {
        let r = []
        p.notas.forEach(element => {
            r = (element)
        });
        return r
    }
    return (
        <div className="Table">
            <h3>Recent Orders</h3>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nota</TableCell>
                            <TableCell>Tipo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {notas.map((nota, i) => (
                            <TableRow
                                key={nota.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {nota.nota} </TableCell>
                                <TableCell component="th" scope="row"> {nota.tipo} </TableCell>
                                <TableCell align="left">
									<IconButton color="default" aria-label="crear fila" onClick={() => {handleDelete(i)}}>
										<ClearIcon fontSize='medium' />
									</IconButton>
								</TableCell>
                            </TableRow>
                            
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
