import * as React from "react";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import "./Table.css";


const makeStyle = (status) => {
	if (status === 'Justificada') {
		return {
			background: 'rgb(145 254 159 / 47%)',
			color: 'green',
		}
	}
	else {
		return {
			background: '#ffadad8f',
			color: 'red',
		}
	}
}

export default function BasicTable(props) {
	const [inasists, setInasists] = useState([]);
	setInasists(props)
	let total = 0;
	const getPesoFalta = (tipo) => {
		if (tipo === "Tarde") {
			return 0.5
		}
		else if (tipo === "Falta") {
			return 1
		}
		else { return 0 }
	}

	const handleDelete = (postIndex) => {
		setInasists((prevPosts) =>
		  prevPosts.filter((_, index) => index !== postIndex)
		);
	  };

	return (
		<div className="Table">
			<h3>Inasistencias</h3>
			<TableContainer
				component={Paper}
				style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
			>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Fecha</TableCell>
							<TableCell align="left">Tipo</TableCell>
							<TableCell align="left">Total</TableCell>
							<TableCell align="left">Justificacion</TableCell>
						</TableRow>
					</TableHead>
					<TableBody style={{ color: "white" }}>

						{inasists.map((elem,i) => (
							<TableRow
								key={elem._id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">{elem.fecha.split("T")[0]}</TableCell>
								<TableCell align="left">{elem.tipo}</TableCell>
								<TableCell align="left">{total = total + getPesoFalta(elem.tipo)}</TableCell>
								<TableCell align="left">
									<span className="status" style={makeStyle(elem.justificado)}>{elem.justificado}</span>
								</TableCell>
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
