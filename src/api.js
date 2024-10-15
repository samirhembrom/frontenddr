
export async function getDocs(id) {
    const url = id ? `http://localhost:3000/api/doctors/${id}` : 'http://localhost:3000/api/doctors';
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: "Failed to fetch doctors",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();

    return id ? data.data.doctor : data.data;
}

export async function getSlots(id) {
    const res = await fetch(`http://localhost:3000/api/slots/${id}`);
    if (!res.ok) {
        throw {
            message: "Failed to fetch doctors",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data.data;
}

export async function loginUser(cred) {
    const res = await fetch("http://localhost:3000/api/user/login", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cred)
    });
    const data = await res.json();
    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }
    return data;
}

export async function signupUser(cred) {
    const res = await fetch("http://localhost:3000/api/user/register", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cred)
    });
    const data = await res.json();
    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }
    return data;
}