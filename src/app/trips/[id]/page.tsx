"use client"

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { getTrip, deleteTrip } from "@/lib/trips";
import { Spinner } from "@/components/Spinner";
import { getDateTime } from "@/lib/dateTime";
import { useRouter } from 'next/navigation'
import { useAsyncData } from "@/hooks/useAsyncData";

export default function Trip({ params }: { params: { id: string } }) {
    const { data: trip, loading, error } = useAsyncData(() => getTrip(params.id), [params.id], "Failed to fetch trip");
    const router = useRouter()

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteTrip(params.id)
            router.push('/trips')
        } catch (error) {
            console.error('Error deleting trip:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const confirmDelete = () => {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            handleDelete();
        }
    };

    return (
        <div className="page-container-narrow py-8">
            <div className="panel mb-6">

                    {loading && <Spinner label="Loading trip..." />}

                    {error && <div className="alert-error">{error}</div>}

                    {!loading && !error && (
                        <>
                            <div className="flex items-center gap-4 mb-6">
                                <Image
                                    className="rounded-full object-cover bg-slate-100"
                                    src="/img/road.png"
                                    width={64}
                                    height={64}
                                    alt="trip"
                                />
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">
                                        {getDateTime(trip?.startDate)}
                                    </h1>
                                    <p className="text-sm text-slate-500">{trip?.id}</p>
                                </div>
                            </div>

                            <dl className="space-y-3 mb-6">
                                <div className="flex items-center justify-between">
                                    <dt className="stat-label">User</dt>
                                    <dd className="text-sm font-medium text-slate-900">{trip?.userId}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="stat-label">Distance</dt>
                                    <dd className="text-sm font-medium text-slate-900">{trip?.distance} km</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="stat-label">Carpool</dt>
                                    <dd>
                                        <span className={trip?.isCarpool ? 'badge-success' : 'badge-neutral'}>
                                            {trip?.isCarpool ? 'Yes' : 'No'}
                                        </span>
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="stat-label">Start</dt>
                                    <dd className="text-sm font-medium text-slate-900">{getDateTime(trip?.startDate)}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="stat-label">Stop</dt>
                                    <dd className="text-sm font-medium text-slate-900">{getDateTime(trip?.stopDate)}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="stat-label">Created At</dt>
                                    <dd className="text-sm font-medium text-slate-900">{getDateTime(trip?.createdAt)}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="stat-label">Updated At</dt>
                                    <dd className="text-sm font-medium text-slate-900">{getDateTime(trip?.updatedAt)}</dd>
                                </div>
                            </dl>

                            <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                                <Link href={`/trips/${params.id}/edit`} className="link-action">
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

            <h2 className="text-lg font-semibold text-slate-900 mb-4">Passengers</h2>
            <div className="empty-state">
                <p className="text-sm">No passengers to show yet.</p>
            </div>
        </div>
    )
}