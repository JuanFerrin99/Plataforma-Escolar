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

const makeStyle=(status)=>{
  if(status === 'Justificada'){
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else{
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
}

export default function BasicTable(rows) {
  const [props, setProps] = useState([]);
  setProps(Object.values(Object.values(rows)[0]))
  console.log(props)
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
              {[rows].map((row) => (
                <TableRow
                key={row.fecha}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fecha}
                  </TableCell>
                  <TableCell align="left">{row.tipo}</TableCell>
                  <TableCell align="left">{row.total}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.justificacion)}>{row.justificacion}</span>
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
