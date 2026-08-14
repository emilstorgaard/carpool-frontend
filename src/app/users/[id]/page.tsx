"use client"

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { getUser, deleteUser } from "@/lib/users";
import { getUserStats } from "@/lib/stats";
import { Spinner } from "@/components/Spinner";
import { getDateTime } from "@/lib/dateTime";
import { useRouter } from 'next/navigation'
import { getUserTrips } from "@/lib/trips";
import { useAsyncData } from "@/hooks/useAsyncData";
import Trips from "@/components/Trips";

export default function User({ params }: { params: { id: string } }) {
    const { data: user, loading: loadingUser, error: userError } = useAsyncData(
        () => getUser(params.id), [params.id], "Failed to fetch user"
    );
    const { data: userStats, loading: loadingStats, error: statsError } = useAsyncData(
        () => getUserStats(params.id), [params.id], "Failed to fetch user stats"
    );
    const { data: userTrips, loading: loadingTrips, error: tripsError, reload: reloadTrips } = useAsyncData(
        () => getUserTrips(params.id), [params.id], "Failed to fetch user trips"
    );

    const loading = loadingUser || loadingStats;
    const error = userError || statsError;
    const router = useRouter()

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteUser(params.id)
            router.push('/users')
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const confirmDelete = () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            handleDelete();
        }
    };

    return (
        <div className="page-container-narrow py-8">
            <div className="panel mb-6">

                    {loading && <Spinner label="Loading user..." />}

                    {error && <div className="alert-error">{error}</div>}

                    {!loading && !error && (
                        <>
                            <div className="flex items-center gap-4 mb-6">
                                <Image
                                    className="rounded-full object-cover bg-slate-100"
                                    src="/img/driver.png"
                                    width={64}
                                    height={64}
                                    alt={user?.name || "user"}
                                />
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">
                                        {user?.name}
                                    </h1>
                                    <p className="text-sm text-slate-500">{user?.id}</p>
                                </div>
                            </div>

                            <dl className="space-y-3 mb-6">
                                <div className="flex items-center justify-between">
                                    <dt className="stat-label">Created At</dt>
                                    <dd className="text-sm font-medium text-slate-900">{getDateTime(user?.createdAt)}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="stat-label">Updated At</dt>
                                    <dd className="text-sm font-medium text-slate-900">{getDateTime(user?.updatedAt)}</dd>
                                </div>
                            </dl>

                            <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                                <Link href={`/users/${params.id}/edit`} className="link-action">
                                    Edit
                                </Link>
                                {isDeleting ? (
                                    <span className="text-sm font-semibold text-red-400">Deleting...</span>
                                ) : (
                                    <button onClick={confirmDelete} className="link-danger">
                                        Delete
                                    </button>
                                )}
                            </div>
                        </>
                    )}
            </div>

            {!loading && !error && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="panel">
                        <p className="stat-label">Trips</p>
                        <p className="stat-value">{userStats?.totalTrips}</p>
                    </div>
                    <div className="panel">
                        <p className="stat-label">Distance</p>
                        <p className="stat-value">{userStats?.totalDistance} km</p>
                    </div>
                    <div className="panel">
                        <p className="stat-label">Time</p>
                        <p className="stat-value">{userStats?.totalTime}</p>
                    </div>
                </div>
            )}

            {loadingTrips && <Spinner label="Loading trips..." />}

            {tripsError && <div className="alert-error">{tripsError}</div>}

            {!loadingTrips && !tripsError && (
                <>
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Trips</h2>
                    <Trips trips={userTrips ?? []} onDelete={reloadTrips} />
                </>
            )}
        </div>
    )
}