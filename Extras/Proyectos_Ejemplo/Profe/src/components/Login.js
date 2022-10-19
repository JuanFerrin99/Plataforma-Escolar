import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation()
    const navigate = useNavigate();

    console.log(location)

    const handleLogin = () => {

        const body = {
          username: email,
          password: password
        }
    
        const options = {
          withCredentials: true
        }
    
        axios.post( "http://localhost:3001/auth/login", body, options)
        .then(body => {
            navigate(location.state.paginaAnterior, { replace: true });
        })
        .catch(e => console.log(e));
      }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }


    return (
        <div>
           User
           <input type="email" onChange={handleEmailChange} value={email} ></input>
           Password
           <input type="password" onChange={handlePasswordChange} value={password}></input>
           <button onClick={handleLogin}>Login</button>
        </div>
    )

}