import { useEffect, useState } from "react";
import Table from "../../tables/TableInasistenciaInmodificable/Table.jsx";
import { fetchGet } from "../../utils/Fetch.jsx";


export default function Home({dni}) {
    const [inasistencias, setInasistencias] = useState([])
    useEffect(() => {
        fetchGet(`inasistencias/filtro/${dni}`)
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