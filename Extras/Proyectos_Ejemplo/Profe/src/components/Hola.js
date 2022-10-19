import { Link } from "react-router-dom";

export default function Hola() {


    return (
        <div>
            Hola
            <br />
            <Link to='/chau'  state={{rutaOrigen: 'Hola'}}>Ir a Chau</Link>
        </div>
    )

}