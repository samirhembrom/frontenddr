import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="notfound">
            <div className="container-notfound">
                <h1 className="header-notfound">Sorry, the page you were looking for was not found.</h1>
                <Link to="/" className="btn btn-notfound">Home</Link>
            </div>

        </main>
    )
}

export default NotFound;