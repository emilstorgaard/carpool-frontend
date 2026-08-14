'use server'

import { apiFetch } from "@/lib/api";
import type { Trip } from "@/types";

export async function getTrips(): Promise<Trip[]> {
    return apiFetch<Trip[]>("/Trips");
}

export async function getTrip(id: string): Promise<Trip> {
    return apiFetch<Trip>(`/Trips/${id}`);
}

export async function getUserTrips(userId: string): Promise<Trip[]> {
    return apiFetch<Trip[]>(`/Trips/User/${userId}`);
}

export async function postTrip(userId: string, distance: number, isCarpool: boolean, startDate: string, stopDate: string): Promise<void> {
    await apiFetch<void>("/Trips", {
        method: "POST",
        body: JSON.stringify({ userId, distance, isCarpool, startDate, stopDate }),
    });
}

export async function putTrip(tripId: string, userId: string, distance: number, isCarpool: boolean, startDate: string, stopDate: string): Promise<void> {
    await apiFetch<void>(`/Trips/${tripId}`, {
        method: "PUT",
        body: JSON.stringify({ userId, distance, isCarpool, startDate, stopDate }),
    });
}

export async function deleteTrip(id: string): Promise<void> {
    await apiFetch<void>(`/Trips/${id}`, {
        method: "DELETE",
    });
}