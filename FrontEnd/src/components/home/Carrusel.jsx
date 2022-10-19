import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core";
import '../../styles/pages/HomePage.css';
const items = [
    {
        name: "Solicita ahora tu beca",
        description: "Beca 50% Ciclo Lectivo 2023. 10 Cuotas de Marzo a Diciembre"
    },
    {
        name: "Tus Primeros Pasos en Electrónica",
        description: "Unite a los Cursos Cortos de Electrónica Básica del ISE"
    },{
        name: "Conocé el instituto",
        description: "Desde 1962, el Instituto Superior de Electrónica formó más de 5.000 profesionales electrónicos."
    }
];
const useStyles = makeStyles((theme) => ({}));
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
            <h1 key={index}>{element.name}</h1>
            <p key={index}>{element.description}</p>
            <button id="botonInfo">+ INFO</button>
            </>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
