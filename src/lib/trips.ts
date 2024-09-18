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

export async function getUserTrips(userId: string) {
    const res = await fetch(`${apiUrl}/Trips/User/${userId}`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export async function postTrip(userId: string, distance: string, isCarpool: boolean, startDate: string, stopDate: string) {
    const res = await fetch(`${apiUrl}/Trips`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            distance,
            isCarpool,
            startDate,
            stopDate
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to add trip");
    }
}

export async function deleteTrip(id: string) {
    await fetch(`${apiUrl}/Trips/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}