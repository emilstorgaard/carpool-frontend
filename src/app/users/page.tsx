"use client"

import { useState, useEffect, Suspense } from 'react';
import { Spinner } from "@/components/Spinner";
import { getUsers } from "@/lib/users";
import Users from "@/components/Users";

type User = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

function User() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUsers() {
            setLoading(true);
            try {
                const initialUsers = await getUsers();
                setUsers(initialUsers);
            } catch (err) {
                setError("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const reloadUsers = () => {
        async function fetchUsers() {
            setLoading(true);
            try {
                const initialUsers = await getUsers();
                setUsers(initialUsers);
            } catch (err) {
                setError("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    };

    return (
        <div className="container mx-auto">
            
            {loading && (
                <div className="flex justify-center">
                    <Spinner />
                </div>
            )}

            {error && 
                <div className="flex justify-center">
                    <div className="text-red-500 mt-2">{error}</div>
                </div>
            }

            {!loading && !error && (
                <>
                    <Users users={users} onDelete={reloadUsers} />
                </>
            )}
        </div>
    );
}

export default function UsersPage() {
    return (
        <Suspense fallback={<Spinner />}>
            <User />
        </Suspense>
    )
}