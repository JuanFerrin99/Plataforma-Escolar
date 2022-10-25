import React from 'react'
import { useEffect, useState } from "react";
import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import CursosCard from "../../cards/CursoCard";

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
	const [cursos, setCursos] = useState([]);
	const [curso, setCurso] = useState({});
	const [loading, setLoading] = useState(true);




	useEffect(() => {
		fetch(`http://localhost:3001/cursos/`, { credentials: 'include' })
			.then(response => response.json())
			.then(cursos => {
				setCursos(cursos)
				setLoading(false)
			})
			.catch(error => {
				console.log(error)
			})
	}, []);

	const cursosComponent = cursos.map((curso, i) => {
		return <CursosCard key={curso._id} setCurso={setCurso} curso={curso} />
	})

	const cursosSkeleton = new Array(20).fill(<Variants />)

	if (Object.keys(curso).length === 0) {
		return (
			<div>
				<Grid width={"100vw"}container spacing={3}>
					{loading ? cursosSkeleton : cursosComponent}
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
