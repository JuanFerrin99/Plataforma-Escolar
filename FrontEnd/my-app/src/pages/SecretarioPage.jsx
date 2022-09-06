import "../styles/SecretarioPage.css";
import MainDash from "../components/SecretarioComps/MainDash/MainDash";
import Sidebar from "../components/SecretarioComps/Sidebar";

export default function Hub() {
    return (
        <div className="App">
            <div className="AppGlass">
                    <Sidebar />
                    <MainDash />
            </div>
        </div>
    );
}

