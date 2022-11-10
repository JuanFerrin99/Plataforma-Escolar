import Carousel from "react-material-ui-carousel";

import '../../styles/pages/HomePage.css';
const items = [
	{
		key: "1",
		name: "Solicita ahora tu beca",
		description: "Beca 50% Ciclo Lectivo 2023. 10 Cuotas de Marzo a Diciembre",
		direccion:"/carrera"
	},
	{
		key: "2",
		name: "Tus Primeros Pasos en Electrónica",
		description: "Unite a los Cursos Cortos de Electrónica del ISE",
		direccion:"/cursos"
	}, {
		key: "3",
		name: "Conocé el instituto",
		description: "Desde 1962, el Instituto Superior de Electrónica formó más de 5.000 profesionales electrónicos",
		direccion:"/informacion"
	}
];

export default function App() {
	return (
		<div className="Carousel">
			<div className="slider">
				<Carousel
					indicatorIconButtonProps={{
						style: {
							padding: "10px", // 1
							color: "#1c2538"
						}
					}}
					indicatorContainerProps={{
						style: {
							marginTop: "30px"
						}
					}}
				>
					{items.map((element, index) => (
						<>
							<h1>{element.name}</h1>
							<p>{element.description}</p>
							<a href={`${element.direccion}`}><button id="botonInfo">+ INFO</button></a>
						</>
					))}
				</Carousel>
			</div>
		</div>
	);
}
