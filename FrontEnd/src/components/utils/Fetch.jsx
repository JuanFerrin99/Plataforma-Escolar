const prefijo = "http://localhost:3001/"
module.exports.fetchGet = (url) => {
    return fetch(`${prefijo}${url}`, { credentials: 'include' })
        .then(response => response.json())
        .then(res => res)
        .catch(error => { console.log(error) })
}

/* Para accederlo
 
    func('https://randomuser.me/api/?results=10')
        .then(users => console.log(users))  
        .catch(err => /* handle errors */