//const prefijo = "https://plataforma-escolar.onrender.com/"
const prefijo = "http://localhost:3001/"

module.exports.fetchGet = (url) => {
    return fetch(`${prefijo}${url}`, { credentials: 'include' })
        .then(res => res)
        .catch(error => { console.log(error) })
}

module.exports.fetchPost = (url, body) => {
    return fetch(`${prefijo}${url}`, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(res => res)
        .catch(error => { console.log(error) })
}

module.exports.fetchPatch = (url, body) => {
    return fetch(`${prefijo}${url}`, {
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(res => res)
        .catch(error => { console.log(error) })
}

module.exports.fetchDelete = (url) => {
    return fetch(`${prefijo}${url}`, {
        credentials: 'include',
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(res => res)
        .catch(error => { console.log(error) })
}