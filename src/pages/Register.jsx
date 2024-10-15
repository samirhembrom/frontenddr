import React from "react";
import { Form, Link, redirect, useLoaderData, useActionData, useNavigate, useNavigation } from "react-router-dom";
import Cookies from 'js-cookie';

import { signupUser } from "../api";
import { useAuth } from "../AuthContext";

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const passwordConfirm = formData.get("passwordConfirm");
    const role = formData.get("role");
    const phone = formData.get("phone");
    const photoUrl = formData.get("photoUrl");
    const qualification = formData.get("qualification");
    const specialty = formData.get("specialty");
    const experience = formData.get("experience");
    console.log({ name, email, password, passwordConfirm, role, phone, photoUrl, qualification, specialty, experience });
    try {
        const data = await signupUser({ name, email, password, passwordConfirm, role, phone, photoUrl, qualification, specialty, experience });
        if (data.token) {
            return data;
        }
    } catch (err) {
        return { error: err.message };
    }
    return null;
}

export function loader({ request }) {
    const token = Cookies.get('token'); // Check if the user has a token

    if (token) {
        // If the user is logged in, redirect them to the dashboard or home page
        return redirect('/host'); // Or wherever you want to redirect logged-in users
    }
    return new URL(request.url).searchParams.get("message");
}


export default function Register() {
    const message = useLoaderData();
    const actionData = useActionData();
    const navigate = useNavigate();
    const { login } = useAuth();
    const navigation = useNavigation();
    const searchParams = new URLSearchParams(location.search);
    const redirectTo = searchParams.get("redirectTo") || "/host"; // Default fallback route


    React.useEffect(() => {
        if (actionData?.token) {
            // Call the login function when actionData is available and has a token
            login(actionData.token, actionData.data.user._id, actionData.data.user.email);
            navigate(redirectTo, { replace: true });
        }
    }, [actionData, login, navigate]);

    const handleRoleChange = (event) => {
        const doctorFields = document.getElementsByClassName("doctorFields");
        for (let i = 0; i < doctorFields.length; i++) {
            if (event.target.value === "doctor") {
                doctorFields[i].style.display = "block";
            } else {
                doctorFields[i].style.display = "none";
            }
        }
    };

    return (
        <main>
            <div className="login-container mt-r">
                <h1>Sign up</h1>
                {message && <h3 className="red">{message}</h3>}
                {actionData?.error && <h3 className="red">{actionData.error}</h3>}
                <Form method="post" className="login-form" replace>
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        name="passwordConfirm"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <select
                        name="role"
                        onChange={handleRoleChange}
                    >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                    <input
                        name="phone"
                        type="text"
                        placeholder="Phone"
                    />
                    <input
                        name="photoUrl"
                        type="text"
                        placeholder="Photo"
                    />
                    <input
                        className="doctorFields"
                        style={{ display: "none" }}
                        name="qualification"
                        type="text"
                        placeholder="Qualification"
                    />
                    <input
                        className="doctorFields"
                        style={{ display: "none" }}
                        name="specialty"
                        type="text"
                        placeholder="Specialty"
                    />

                    <input
                        className="doctorFields"
                        style={{ display: "none" }}
                        name="experience"
                        type="text"
                        placeholder="Experience"
                    />
                    <p className="check">Already have an account? <Link to="/login" className="link">Sign in</Link></p>
                    <button disabled={navigation.state === "submitting"}>{navigation.state === "submitting" ? "Signing up..." : "Sign up"}</button>
                </Form>
            </div>
        </main>
    )
}