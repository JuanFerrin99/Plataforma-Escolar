import React from 'react'
import { useEffect, useState } from "react";
import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import AlumnoCard from "../../cards/AlumnoCard";

function Variants() {
	return (
		<Grid item xs={4}>
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Skeleton variant="rectangular" width={210} height={10} />
					<br />
					<Skeleton variant="rectangular" width={210} height={10} />
					<br />
					<Skeleton variant="rectangular" width={100} height={5} />
					<br />
					<Skeleton variant="rectangular" width={100} height={5} />
					<br />
					<Skeleton variant="rectangular" width={100} height={5} />
				</CardContent>
				<CardActions>
					<Skeleton variant="rectangular" width={50} height={2} />
				</CardActions>
			</Card>
		</Grid>
	);
}

export default function Alumnos() {
    const [alumnos, setAlumnos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`http://localhost:3001/alumnos/`,{credentials:'include'})
			.then(response => response.json())
			.then(alumnos => {
				setAlumnos(alumnos)
				setLoading(false)
			})
			.catch(error => {
				console.log(error)
			})
	}, []);

	const alumnosComponent = alumnos.map((alumno, i) => {
		return <AlumnoCard key={alumno._id} nombre={alumno.nombre} apellido={alumno.apellido} dni={alumno.dni} />
	})

	const alumnosSkeleton = new Array(20).fill(<Variants />)

	return (
		<div>
			<Grid container spacing={3}>
				{loading ? alumnosSkeleton : alumnosComponent}
			</Grid>
		</div>
	)
}
