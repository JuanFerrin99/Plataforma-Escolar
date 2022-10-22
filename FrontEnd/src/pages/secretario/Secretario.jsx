import React, { useState } from "react";
import MainDash from "../../components/administrativos/MainDash/MainDash";
import Sidebar from "../../components/administrativos/Sidebar/Sidebar";
import "../../styles/pages/SecretarioPage.css";

//!deje el boton de cerrar sesion porque el ultimo elemento de el array se manda al fondo y no se como sacarlo

export default function Hub() {
    const [index, setIndex] = useState(0);
    return (
        <div className="App">
            <div className="AppGlass">
                    <Sidebar indexChanger={setIndex} index={index} />
                    <MainDash index={index} />
            </div>
        </div>
    );
}

