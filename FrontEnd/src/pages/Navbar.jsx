import React, { useState } from 'react'
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa'

import '../styles/pages/Navbar.css'

const Navbar = () => {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const closeMenu = () => setClick(false)

    const [colorChange, setColorchange] = useState(false);
    const changeNavbarColor = () =>{
       if(window.scrollY >= 30){
         setColorchange(true);
       }
       else{
         setColorchange(false);
       }
    };
    window.addEventListener('scroll', changeNavbarColor);

    return (<>
        <div className='header'>
            <nav className={colorChange ? 'navbar colorChange' : 'navbar'}>
                <a href='/' className='logo'>
                    <img src="https://ise.com.ar/wp-content/uploads/2021/08/marca-ise-h-fb-2_.png" alt='logo' />
                </a>
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                        : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <a href='/login' onClick={closeMenu}>ACCESO</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/informacion' onClick={closeMenu}>EL INSTITUTO</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/cursos' onClick={closeMenu}>CURSOS</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/carrera' onClick={closeMenu}>CARRERA</a>
                    </li>
                    <li className='nav-item' id="inscripcion">
                        <a href='/inscripcion' onClick={closeMenu}>INSCRIBITE</a>
                    </li>
                </ul>
            </nav>
            
        </div>
        <Container>
        <Outlet />
        </Container>
        </>
    )
}

export default Navbar


    