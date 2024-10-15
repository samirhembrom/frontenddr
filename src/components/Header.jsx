import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from '../assets/doctor-svgrepo-com.svg';

import { useAuth } from "../AuthContext";
import LogoutButton from "./LogoutButton";

function Header() {
    const { isLoggedIn } = useAuth();
    return (
        <header>
            <nav className="navbar-1">
                <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/doctors">Find Doctors</NavLink>
                <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/bookappointments">Book Appointments</NavLink>
                <NavLink className={({ isActive }) => isActive ? "active" : ""
                } to="/consultation" > Consultations</NavLink >
            </nav >
            <Link to="/"><img className="img-logo" src={Logo} alt="Logo" /></Link>
            <nav className="navbar-2">
                {isLoggedIn ? (
                    // Show LogoutButton and My Profile link when the user is logged in
                    <>
                        <LogoutButton />
                        <Link to="/host">My Profile</Link>
                    </>
                ) : (
                    // Show Sign In/Sign Up link when the user is not logged in
                    <Link className="btn btn-login" to="/login">Sign In/Sign Up</Link>
                )}
            </nav>
        </header >
    );
}

export default Header;