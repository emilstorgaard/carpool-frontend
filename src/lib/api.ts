const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/** Shared fetch wrapper for the backend API: builds the URL, sets JSON headers and surfaces non-OK responses as errors. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${apiUrl}${path}`, {
        cache: "no-store",
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
    });

    if (!res.ok) {
        throw new Error(`Request to ${path} failed with status ${res.status}`);
    }

    // Some endpoints respond with 200/201 and an empty body, not just 204.
    const text = await res.text();
    if (!text) {
        return undefined as T;
    }

    return JSON.parse(text) as T;
}
