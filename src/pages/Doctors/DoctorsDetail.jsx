import React, { useState, useEffect } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";
import { getDocs } from "../../api";

import Logo from '../../assets/doctor-svgrepo-com.svg';
import Slots from "./Slots";

export function loader({ params }) {
    return getDocs(params.id);
}


function DoctorsDetail() {
    const params = useParams();
    const doctor = useLoaderData();
    // const [doctor, setDoctor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    // useEffect(() => {
    //     const sendRequest = async () => {
    //         setIsLoading(true);
    //         try {
    //             let response = await fetch(`http://localhost:3000/api/doctors/${params.id}`);
    //             let responseData = await response.json();
    //             if (!response.ok) {
    //                 throw new Error(responseData.message);
    //             }

    //             setDoctor(responseData.data.doctor);

    //         } catch (err) {
    //             setError(err.message);
    //         }
    //         setIsLoading(false);

    //     }
    //     sendRequest();
    // }, [params.id]);

    return (
        <main>
            <Link relative="path" to=".." className="back-link"><span>&#8656;</span> Back to all doctors</Link>
            <div className="doctor-container">
                <div className="doctor-detail-container">
                    {doctor ? (
                        <div className="doctor-detail">
                            <img src={Logo} height="150" alt="doctor-image" />
                            <h2>{doctor.name}</h2>
                            <p>{doctor.specialty}</p>
                            <p>{doctor.email}</p>
                            <p>{doctor.phone}</p>
                            <p>{doctor.experience}</p>
                        </div>
                    ) : <h2>Loading</h2>}
                </div>
                <div className="doctor-slots-container">
                    {<Slots id={params.id} />}
                </div>

            </div>


        </main >
    )
}

export default DoctorsDetail;