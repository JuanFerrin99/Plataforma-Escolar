import React from "react";
import '../styles/pages/InfoInstitucional.css';

export default function Info() {
  return (
    <div  className="Info">
      <img id="imgHero" src="https://ise.com.ar/wp-content/uploads/2021/08/cropped-GettyImages-1226985345-scaled-1.jpg" />
      <div id="encabezado">
        <h1>Tecnicatura Superior en Electrónica</h1>
        <h2>(R.S.S.G.E.y.C.P. 555/11)</h2>
      </div>
      <p id="textoInfo">
        En el Instituto Superior de Electrónica Manuel Savio (ISE) A-558, afrontamos exitosamente la responsabilidad de crear, modificar y actualizar los cursos de electrónica.<br />
      </p>
    </div>
  );
}