import React from "react";
import { useRouteError } from "react-router-dom";

function Error() {
    const error = useRouteError();

    return (
        <main>
            <h1>Error: {error.message}</h1>

        </main>
    )
}

export default Error;