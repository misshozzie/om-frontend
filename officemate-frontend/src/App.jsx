import { Outlet } from "react-router-dom";
import NavBar from "./components/Layout/NavBar";
//import Footer from "./components/Layout/Footer";

const App = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default App;