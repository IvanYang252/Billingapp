import './MenuBar.css';
import logo from '../../assets/assets.js';
import { Link } from 'react-router-dom';

const MenuBar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            <a class="navbar-brand" href="#">
                <img src={logo} alt="Logo" height="60" />
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
                {/* Add the dropdown for user profile */}
            </div>
        </nav>
    )
}

export default MenuBar;