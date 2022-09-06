import '../styles/paginas/login.css'

export default function Login() {

    return (
        <div >
            <p> Username </p>
 import '../styles/paginas/login.css'

export default function Login() {

    return (
        <div >
            <p> Username </p>
            <input type="text" value={""} /> 

            <br/>
            
            <p> Password </p>
            <input type="password" value={""} /> 
            <button> Login </button>
        </div>
    )
}
