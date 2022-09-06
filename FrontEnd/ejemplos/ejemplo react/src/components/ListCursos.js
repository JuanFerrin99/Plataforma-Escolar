export default function ListCursos ({ cursos }) {

    const cursosComponent = cursos.map((curso, i) => {
        return (
            <div key={i}>
                Nombre: {curso.nombre}. Nota: {curso.nota}
            </div>
        )
    })

    return cursosComponent
}