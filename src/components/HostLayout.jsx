import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function HostLayout() {
    return (
        <>
            <nav className="host-nav">
                <NavLink end className={({ isActive }) => isActive ? "active" : ""} to=".">Dashboard</NavLink>
                <NavLink className={({ isActive }) => isActive ? "active" : ""} to="consultations">Booking/Consultations</NavLink>
            </nav>
            <Outlet />
        </>
    )
}

export default HostLayout;