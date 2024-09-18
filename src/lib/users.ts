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

export async function deleteUser(id: string) {
    await fetch(`${apiUrl}/Users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}