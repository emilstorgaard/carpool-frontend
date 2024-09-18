'use server'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUserStats(id: string) {
    const res = await fetch(`${apiUrl}/Stats/User/${id}`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export async function getTotalStats() {
    const res = await fetch(`${apiUrl}/Stats/Total`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export async function getUsersStats() {
    const res = await fetch(`${apiUrl}/Stats/Users`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}
