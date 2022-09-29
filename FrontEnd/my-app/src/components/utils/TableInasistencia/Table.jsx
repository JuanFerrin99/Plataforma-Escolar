import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useEffect, useState } from "react";

const makeStyle = (status) => {
	if (status === 'True') {
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
							<TableCell align="left"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody style={{ color: "white" }}>

						{props.inasistencia.map((elem) => (
							<TableRow
							key={elem._id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">{elem.fecha}</TableCell>
								<TableCell align="left">{elem.tipo}</TableCell>
								<TableCell align="left">{elem.total}</TableCell>
								{console.log(elem)}
								<TableCell align="left">
									<span className="status" style={makeStyle(elem.justificado)}>{elem.justificado}</span>
								</TableCell>

								<TableCell align="left" className="Details">Details</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
