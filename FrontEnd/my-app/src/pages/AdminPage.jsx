import "../styles/AdminPage.css";
import MainDash from "../components/AdminComps/MainDash/MainDash";
import Sidebar from "../components/AdminComps/Sidebar";

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

