import { Outlet } from "react-router-dom";
import NavBar from "../src/components/Share/NavBar";
import Footer from "../src/components/Share/Footer";

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