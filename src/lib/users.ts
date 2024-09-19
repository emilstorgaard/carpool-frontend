'use server'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers() {
    const res = await fetch(`${apiUrl}/Users`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export async function getUser(id: string) {
    const res = await fetch(`${apiUrl}/Users/${id}`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export async function postUser(name: string) {
    const res = await fetch(`${apiUrl}/Users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to add user");
    }
}

export async function putUser(userId: string, name: string) {
    const res = await fetch(`${apiUrl}/Users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to edit user");
    }
}

export async function deleteUser(id: string) {
    await fetch(`${apiUrl}/Users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}