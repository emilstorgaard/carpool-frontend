'use server'

import { apiFetch } from "@/lib/api";
import type { TotalStats, UserStats, UserTripStats } from "@/types";

export async function getUserStats(id: string): Promise<UserStats> {
    return apiFetch<UserStats>(`/Stats/User/${id}`);
}

export async function getTotalStats(): Promise<TotalStats> {
    return apiFetch<TotalStats>("/Stats/Total");
}

export async function getUsersStats(): Promise<UserTripStats[]> {
    return apiFetch<UserTripStats[]>("/Stats/Users");
}
