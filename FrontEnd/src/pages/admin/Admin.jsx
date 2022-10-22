import "../../styles/pages/AdminPage.css";
import MainDash from "../../components/administrativos/MainDash/MainDash";
import Sidebar from "../../components/AdminComps/Sidebar";

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

