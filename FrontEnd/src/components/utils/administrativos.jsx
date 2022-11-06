
export const getDay = (dayIndex) =>{return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex]}

export const getDayIndex = (day) =>{return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(day)}

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
export  const changeHandler = (event, firstKey, setGeneralInstance, setIsShown) => {
    let valorUpdateado = { [firstKey]: event.target.value }
    setGeneralInstance(current => ({ ...current, ...valorUpdateado }))
    setIsShown(true);
}

export const changeHandlerComplex = (value, firstKey, setter, original, setGeneralInstance, setIsShown, instances) => {

    if (!focusInCurrentTarget(value)) {
        let t = instances
        t.splice(t.indexOf(original), 1, value.target.value)
        setGeneralInstance(current => ({ ...current, ...{ [firstKey]: t } }))
        setter(t)
        setIsShown(true);
    }

}

export const changeHandleDia = (value, firstKey, secondKey, dia, setCurso, dias, setIsShown) => {
    if (!focusInCurrentTarget(value)) {
        let t = dias
        t.splice(t.indexOf(getDayIndex(dia)), 1, value.target.value)
        setCurso(current => ({ ...current,  ...{[firstKey] : current.periodo, ...{[secondKey]: t} } }))
        setIsShown(true);
    }

}

export const changeObjectHandler = (event, firstKey, secondKey, setIsShown,setGeneralInstance) => {
    setGeneralInstance(current => {
        let copia = current
        let res = {}
        copia[firstKey][secondKey] = event.target.value
        return ({ ...current, ...copia[firstKey] })
    })
    setIsShown(true);
}
//* handle create
export const handleCreateTitulo = (setGeneralInstance, setTitulos,setIsShown,titulos) => {
    setGeneralInstance(current => ({ ...current, ...{ titulos: [...titulos, ""] } }))
    setTitulos(current => [...current, ""])
    setIsShown(true);
}

export const handleCreate = (key, setter, values, setIsShown, setGeneralInstance) => {
    setGeneralInstance(current => ({ ...current, ...{ [key]: [...values, ""] } }))
    setter(current => [...current, ""])
    setIsShown(true);
}
//* handle delete
export const handleDelete = (instance, key, setter, values, setIsShown, setGeneralInstance) => {
    if (instance !== undefined) {
        let t = []
        t = values
        t.splice(t.indexOf(instance), 1)
        setGeneralInstance(current => ({ ...current, [key]: t }))
        setter(t)
        setIsShown(true);
    }
}
export const handleDeleteAlt = (instance, key, setter,setterAlumno, values, setIsShown) => {
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

export const handleDeleteTitulo = (titulo, setIsShown, titulos, setGeneralInstance, setTitulos) => {
    if (titulo !== undefined) {
        let t = []
        t = titulos
        t.splice(t.indexOf(titulo), 1)
        setGeneralInstance(current => ({ ...current, titulos: t }))
        setTitulos(t)
        setIsShown(true);
    }
}
export const handleDeleteAlumnos = (setIsShown, alumnos, dni, setCurso) => {
    if (curso !== undefined) {
        let a = alumnos
        a.splice(a.indexof(dni), 1)
        a.splice(t.indexOf(titulo), 1)
        setCursos(current => ({...current, ...{ alumnos: a }}) )
        setIsShown(true);
    }
}