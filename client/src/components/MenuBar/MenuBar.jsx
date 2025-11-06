import './MenuBar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.jsx';
import { useContext } from 'react';

const MenuBar = () => {
    const navigate = useNavigate();
    const {setAuthData} = useContext(AppContext);
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuthData(null, null);
        navigate("/login");
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            <a class="navbar-brand" href="#">
                <img src={assets.logo} alt="Logo" height="60" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse p-2" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link class="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/explore">Explore</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/category">Manage Categories</Link>
                    </li>   
                    <li class="nav-item">
                        <Link class="nav-link" to="/items">Manage Items</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/users">Manage Users</Link>
                    </li>
                </ul>

                {/*Dropdown for user profile*/}
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" id='navbarDropDown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                            <img src={assets.profile} alt="" height={32} width={32}/>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby='navbarDropdown'>
                            <li>
                                <a href="#!" className="dropdown-item">
                                    Settings
                                </a>
                                <a href="#!" className="dropdown-item">
                                    Activity log
                                </a>
                                <li>
                                    <hr className='dropdown-divider'/>
                                </li>
                                <a href="#!" className="dropdown-item" onClick={logout}>
                                    Log out
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MenuBar;