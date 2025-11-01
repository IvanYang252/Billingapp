import {Route, Routes, useLocation} from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login.jsx";


const App = () => {
    const location = useLocation(); {/* Get current route location */}
    return (
        <div>
            {location.pathname !== "/login" && <MenuBar />} {/* Hide MenuBar on Login page */}
            <Toaster />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/category" element={<ManageCategory />} />
                <Route path="/items" element={<ManageItems />} />
                <Route path="/users" element={<ManageUsers />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </div>
    );
};

export default App;