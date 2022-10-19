import MainDash from "../../components/SecretarioComps/MainDash/MainDash";
import Sidebar from "../../components/SecretarioComps/Sidebar";
import "../../styles/pages/SecretarioPage.css";

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

