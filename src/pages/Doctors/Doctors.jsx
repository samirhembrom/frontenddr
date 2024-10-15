import React, { useEffect, useState } from "react"
import { Link, useLoaderData } from "react-router-dom";
import { getDocs } from '../../api';

import Logo from '../../assets/doctor-svgrepo-com.svg';

export function loader() {
    return getDocs();
}

function Doctors() {
    const [error, setError] = useState(null);
    const doctors = useLoaderData();

    const docElements = doctors.map(doctor => (
        <div key={doctor._id} className="doc-tile">
            <Link to={`/doctors/${doctor._id}`}>
                <img src={Logo} height="50" alt="doctor-image" />
                <div className="doc-info">
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                    <p>{doctor.experience}</p>
                </div>
            </Link>
        </div >
    ));

    return (
        <>
            <main>
                <h1 className="doc-header">Doctors</h1>
                <div className="doc-list-container">
                    <div className="doc-list">
                        {docElements}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Doctors