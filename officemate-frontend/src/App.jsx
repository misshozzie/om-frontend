import { Outlet } from "react-router-dom";
import NavBar from "./components/Share/NavBar";
import Footer from "./components/Share/Footer";

const App = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default App;