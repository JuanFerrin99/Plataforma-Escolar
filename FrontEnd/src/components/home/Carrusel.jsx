import Carousel from "react-material-ui-carousel";

import '../../styles/pages/HomePage.css';
const items = [
    {
        key:"1",
        name: "Solicita ahora tu beca",
        description: "Beca 50% Ciclo Lectivo 2023. 10 Cuotas de Marzo a Diciembre"
    },
    {
        key:"2",
        name: "Tus Primeros Pasos en Electrónica",
        description: "Unite a los Cursos Cortos de Electrónica Básica del ISE"
    },{
        key:"3",
        name: "Conocé el instituto",
        description: "Desde 1962, el Instituto Superior de Electrónica formó más de 5.000 profesionales electrónicos"
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
            <h1 key={element.key}>{element.name}</h1>
            <p key={element.key}>{element.description}</p>
            <button id="botonInfo">+ INFO</button>
            </>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
