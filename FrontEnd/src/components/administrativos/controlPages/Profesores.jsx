import React from 'react'
import { useEffect, useState } from "react";
import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import ProfesorCard from "../../cards/ProfesorCardSecretario";

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
	const [profesores, setProfesores] = useState([]);
	const [profesor, setProfesor] = useState({});
	const [loading, setLoading] = useState(true);




	useEffect(() => {
		fetch(`http://localhost:3001/profesores/`, { credentials: 'include' })
			.then(response => response.json())
			.then(profesores => {
				setProfesores(profesores)
				setLoading(false)
			})
			.catch(error => {
				console.log(error)
			})
	}, []);

	const profesoresComponent = profesores.map((profesor, i) => {
		return <ProfesorCard key={profesor._id} setProfesor={setProfesor} profesor={profesor} />
	})

	const profesoresSkeleton = new Array(20).fill(<Variants />)

	if (Object.keys(profesor).length === 0) {
		return (
			<div>
				<Grid width={"100vw"} container spacing={3}>
					{loading ? profesoresSkeleton : profesoresComponent}
				</Grid>
			</div>
		)
	}
	else {
		return (
			<div>
				
			</div>
		)

	}
}
