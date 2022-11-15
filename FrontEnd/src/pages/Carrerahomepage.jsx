import React from "react";
import '../styles/pages/InfoInstitucional.css';

export default function Info() {
  return (
    <div  className="Info">
      <img id="img" src="https://ise.com.ar/wp-content/uploads/2021/11/cropped-fibra-optica.jpg" />
      <div id="encabezado">
        <h1>Tecnicatura Superior en Electrónica</h1>
        <h2>(R.S.S.G.E.y.C.P. 555/11)</h2>
      </div>
      <p id="textoInfo">
      El Instituto Superior de Electrónica “Gral. Manuel N. Savio” fue creado en 1962, y capacita a Técnicos Superiores, otorgando títulos oficiales de validez nacional en el área de la electrónica, las comunicaciones y la computación.

El Instituto desafió la incesante actualización y renovación del área desplegando todas las posibilidades para la formación de Técnicos capaces de afrontar las nuevas tecnologías y los desafíos que impone un mercado laboral cada vez más exigente.
Desde los comienzos se afrontaron exitosamente la responsabilidad de crear, modificar y actualizar proyectos educativos en el campo de la electrónica.

Considerando el modelo de sociedad actual, se hace necesario brindar a los alumnos la formación más completa y actualizada en la electrónica de hoy, para que al egresar puedan insertarse en los puestos de trabajo disponibles
compitiendo lealmente con sus colegas, tomando decisiones en los niveles más altos de la empresa o ámbito donde se desarrollan sus actividades para contribuir al desarrollo socioeconómico.

Dada la relevancia adquirida por las telecomunicaciones, la industria y la computación dentro de la economía, es cada vez mayor la demanda de técnicos capaces de trabajar en estas especialidades a fin de perfeccionarlas y permitir
su desarrollo, lo cual resulta indispensable para un país en crecimiento y en camino hacia una economía abierta al mercado tecnológico.
      </p>
    </div>
  );
}