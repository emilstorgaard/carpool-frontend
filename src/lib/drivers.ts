'use server'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getDrivers() {
    const res = await fetch(`${apiUrl}/Drivers`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export async function getDriver(id: string) {
    const res = await fetch(`${apiUrl}/Drivers/${id}`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export async function deleteDriver(id: string) {
    await fetch(`${apiUrl}/Drivers/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}