import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            UserService.logout();
            // Optionally, you can redirect the user to the home page after logout
            window.location.href = '/';
        }
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Lenny</Link></li>
                
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                
                {/* Display Login and Sign Up for unauthenticated users */}
                {!isAuthenticated && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Sign Up</Link></li>
                    </>
                )}

                {isAuthenticated && (
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
