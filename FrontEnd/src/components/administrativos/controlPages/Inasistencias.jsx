import { useEffect, useState } from "react";
import Table from "../../tables/TableInasistenciaGeneral/Table.jsx";
import { fetchGet } from "../../utils/Fetch.jsx";


export default function Home() {
    const [inasistencias, setInasistencias] = useState([])
    useEffect(() => {
        fetchGet(`inasistencias/`)
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
            <Table inasistencias={inasistencias} />
        </div>
    )
}