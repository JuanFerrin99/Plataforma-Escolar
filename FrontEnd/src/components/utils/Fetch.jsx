import { useEffect } from 'react'

const FetchGet = (url) => {
    useEffect(()=>(
        fetch(URL, {credentials: 'include'})
        .then(response => response.json())
        .then(res => {
            return res
        })
        .catch(error => {
            console.log(error)
        })
    ),[])
}


export default {FetchGet}