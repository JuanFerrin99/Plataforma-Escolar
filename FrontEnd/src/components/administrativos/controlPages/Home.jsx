import { useEffect, useState } from "react";
import Table from "../../utils/TableInasistenciaInmodificable/Table.jsx";

export default function Home({dni}) {
    const [inasistencias, setInasistencias] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/inasistencias/filtro/${dni}`, { credentials: "include" })
            .then(response => response.json())
            .then(res => {
                setInasistencias(res)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);
    return (

        <div className="MainDash">
            <h1>Inasistencias</h1>
            <Table inasistencia={inasistencias} />
        </div>
    )
}

