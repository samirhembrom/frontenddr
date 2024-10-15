import React, { useState, useEffect } from "react";

function Slots(id) {

    const [slots, setSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/slots/${id.id}`);
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setSlots(responseData.data.data);


            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);

        }
        sendRequest();
    }, [id.id]);

    const slotElements = slots.map(slot => (
        <div key={slot._id} className="slots-details">
            <h2>Time: {slot.startTime} to {slot.endTime}</h2>
            <p>Address: {slot.street} {slot.houseNumbers} {slot.town} {slot.city} {slot.postcode} </p>
            <p>Booking Available: {slot.bookings}</p>
        </div >
    ));

    return (slotElements.length == 0 ? <h2>No slots</h2> : slotElements);

}

export default Slots;