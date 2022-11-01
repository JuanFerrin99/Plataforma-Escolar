//* Unfocus with enter
export const focusInCurrentTarget = ({ relatedTarget, currentTarget }) => {
    if (relatedTarget === null) return false;

    var node = relatedTarget.parentNode;

    while (node !== null) {
        if (node === currentTarget) return true;
        node = node.parentNode;
    }

    return false;
}

export const onEnter = (event) => {
    if (event.code === "Enter") {
        document.activeElement.blur()
    }
}
//* Modify handlers
export  const changeHandler = (event, firstKey, setAlumno, setIsShown) => {
    let valorUpdateado = { [firstKey]: event.target.value }
    setAlumno(current => ({ ...current, ...valorUpdateado }))
    setIsShown(true);
}

export  const changeHandlerComplex = (value, firstKey, setter, titulo, setAlumno, setIsShown, titulos) => {

    if (!focusInCurrentTarget(value)) {
        let t = titulos
        t.splice(t.indexOf(titulo), 1, value.target.value)
        setAlumno(current => ({ ...current, ...{ [firstKey]: t } }))
        setter(t)
        setIsShown(true);
    }

}
export  const changeObjectHandler = (event, firstKey, secondKey, setIsShown,setAlumno) => {
    setAlumno(current => {
        let copia = current
        let res = {}
        copia[firstKey][secondKey] = event.target.value
        return ({ ...current, ...copia[firstKey] })
    })
    setIsShown(true);
}
//* handle create
export  const handleCreateTitulo = (setAlumno, setTitulos,setIsShown,titulos) => {
    setAlumno(current => ({ ...current, ...{ titulos: [...titulos, ""] } }))
    setTitulos(current => [...current, ""])
    setIsShown(true);
}

export  const handleCreate = (key, setter, values, setIsShown, setAlumno) => {
    setAlumno(current => ({ ...current, ...{ [key]: [...values, ""] } }))
    setter(current => [...current, ""])
    setIsShown(true);
}
//* handle delete
export  const handleDelete = (instance, key, setter, values, setIsShown, setAlumno) => {
    if (instance !== undefined) {
        let t = []
        t = values
        t.splice(t.indexOf(instance), 1)
        setAlumno(current => ({ ...current, [key]: t }))
        setter(t)
        setIsShown(true);
    }
}
export  const handleDeleteAlt = (instance, key, setter,setterAlumno, values, setIsShown) => {
    if (instance !== undefined) {
        let t = []
        t = values
        t.splice(t.indexOf(instance), 1)
        let tx = []
        tx.map(elem => elem.id)
        setterAlumno(current => ({ ...current, [key] : tx}))
        setter(t)
        setIsShown(true);
    }
}

export  const handleDeleteTitulo = (titulo, setIsShown, titulos, setAlumno, setTitulos) => {
    if (titulo !== undefined) {
        let t = []
        t = titulos
        t.splice(t.indexOf(titulo), 1)
        setAlumno(current => ({ ...current, titulos: t }))
        setTitulos(t)
        setIsShown(true);
    }
}