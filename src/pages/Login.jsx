import React from "react";
import { Form, redirect, useLoaderData, useActionData, useNavigate, useNavigation, Link } from "react-router-dom";
import Cookies from 'js-cookie';

import { loginUser } from "../api";
import { useAuth } from "../AuthContext";


export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    try {
        const data = await loginUser({ email, password });

        // Return data if login is successful
        if (data.token) {
            return data;
        } else {
            // Return error message if login failed
            return { error: "Invalid email or password." };
        }
    } catch (err) {
        return { error: err.message };
    }
}

export function loader({ request }) {
    const token = Cookies.get('token'); // Check if the user has a token

    if (token) {
        // If the user is logged in, redirect them to the dashboard or home page
        return redirect('/host'); // Or wherever you want to redirect logged-in users
    }
    return new URL(request.url).searchParams.get("message");
}


export default function Login() {
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



    return (
        <main>
            <div className="login-container">
                <h1>Sign in to your account</h1>
                {message && <h3 className="red">{message}</h3>}
                {actionData?.error && <h3 className="red">{actionData.error}</h3>}
                <Form method="post" className="login-form" replace>
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
                    <p className="check">Don't have an account? <Link to="/register" className="link">Sign up</Link></p>
                    <button disabled={navigation.state === "submitting"}>{navigation.state === "submitting" ? "Logging in..." : "Log in"}</button>
                </Form>
            </div>
        </main>
    )
}