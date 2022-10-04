import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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

const fechaStyle = (date) => {
	
}


export default function BasicTable(props) {
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
								<TableCell align="left">{total = total + getPesoFalta(elem.tipo)}</TableCell>
								<TableCell align="left">
									<span className="status" style={makeStyle(elem.justificado)}>{elem.justificado}</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
