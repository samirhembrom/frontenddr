import React from 'react';
import { useAuth } from '../AuthContext'; // Adjust the path according to your project structure
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const { logout } = useAuth(); // Access the logout function from context
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleLogout = () => {
        logout(); // Call the logout function to clear auth data
        navigate('/login'); // Redirect to the login page after logout
    };

    return (
        <button className="btn btn-login" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton;
