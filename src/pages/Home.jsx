import React from "react";
import { Link } from "react-router-dom";

function Home() {

  return (
    <>
      <main>
        <div className="banner">
          <h1 className="title">Revolutionizing healthcare with instant appointments and consulations</h1>
          <h2 className="subtitle">Find the best doctors, book instant appointments and make informed health decisions with BookMyDoc.</h2>
          <Link className="btn btn-book" to="/bookappointments">Book Now</Link>
        </div>
      </main>
    </>

  )
}

export default Home
