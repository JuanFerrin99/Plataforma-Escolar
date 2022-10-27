import { useEffect } from 'react'

const FetchGet = (url) => {
    return fetch(url, { credentials: 'include' })
        .then(response => response.json())
        .then(res => res.results)
        .catch(error => { console.log(error) })
}
/* Para accederlo

    func('https://randomuser.me/api/?results=10')
        .then(users => console.log(users))  
        .catch(err => /* handle errors */


export default { FetchGet }