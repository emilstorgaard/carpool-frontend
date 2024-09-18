'use server'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getTrips() {
    const res = await fetch(`${apiUrl}/Trips`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export async function getTrip(id: string) {
    const res = await fetch(`${apiUrl}/Trips/${id}`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export async function deleteTrip(id: string) {
    await fetch(`${apiUrl}/Trips/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}