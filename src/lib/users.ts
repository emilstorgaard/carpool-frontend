'use server'

import { apiFetch } from "@/lib/api";
import type { User } from "@/types";

export async function getUsers(): Promise<User[]> {
    return apiFetch<User[]>("/Users");
}

export async function getUser(id: string): Promise<User> {
    return apiFetch<User>(`/Users/${id}`);
}

export async function postUser(name: string): Promise<void> {
    await apiFetch<void>("/Users", {
        method: "POST",
        body: JSON.stringify({ name }),
    });
}

export async function putUser(userId: string, name: string): Promise<void> {
    await apiFetch<void>(`/Users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
    });
}

export async function deleteUser(id: string): Promise<void> {
    await apiFetch<void>(`/Users/${id}`, {
        method: "DELETE",
    });
}