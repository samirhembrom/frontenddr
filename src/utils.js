import { redirect } from "react-router-dom";
import Cookies from 'js-cookie';

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname;
    const token = Cookies.get('token');
    if (!token) {
        throw redirect(`/login?message=You must log in first.&redirectTo=${pathname}`);
    }

    return null;
}