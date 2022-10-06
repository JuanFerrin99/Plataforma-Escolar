import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

export default function Example(props)
{
    var items = [
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
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                + INFO
            </Button>
        </Paper>
    )
}