import {Route, Routes} from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";


const App = () => {
    return (
        <div>
            <MenuBar />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/category" element={<ManageCategory />} />
                <Route path="/items" element={<ManageItems />} />
                <Route path="/users" element={<ManageUsers />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </div>
    );
};

export default App;