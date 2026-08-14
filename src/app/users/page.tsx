"use client"

import { Suspense } from 'react';
import { Spinner } from "@/components/Spinner";
import { getUsers } from "@/lib/users";
import { useAsyncData } from "@/hooks/useAsyncData";
import Users from "@/components/Users";
import Image from 'next/image';
import Link from 'next/link';

function UsersList() {
    const { data: users, loading, error, reload } = useAsyncData(getUsers, [], "Failed to fetch users");

    return (
        <div className="page-container">
            <div className="page-header flex-row items-center justify-between">
                <div>
                    <h1 className="page-title">Users</h1>
                    <p className="page-subtitle">Manage the people who take part in carpools.</p>
                </div>
                {!loading && !error && (
                    <Link href="/users/add" className="btn-primary">
                        <Image className="h-4 w-4 invert" src="/img/add.png" width={16} height={16} alt="" />
                        Add User
                    </Link>
                )}
            </div>

            {loading && <Spinner label="Loading users..." />}

            {error && <div className="alert-error">{error}</div>}

            {!loading && !error && (
                <Users users={users ?? []} onDelete={reload} />
            )}
        </div>
    );
}

export default function UsersPage() {
    return (
        <Suspense fallback={<Spinner />}>
            <UsersList />
        </Suspense>
    )
}