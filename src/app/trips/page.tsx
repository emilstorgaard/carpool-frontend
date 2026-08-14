"use client"

import { Suspense } from 'react';
import { Spinner } from "@/components/Spinner";
import { getTrips } from "@/lib/trips";
import { useAsyncData } from "@/hooks/useAsyncData";
import Trips from "@/components/Trips";
import Image from 'next/image';
import Link from 'next/link';

function TripsList() {
    const { data: trips, loading, error, reload } = useAsyncData(getTrips, [], "Failed to fetch trips");

    return (
        <div className="page-container">
            <div className="page-header flex-row items-center justify-between">
                <div>
                    <h1 className="page-title">Trips</h1>
                    <p className="page-subtitle">Browse and manage all logged trips.</p>
                </div>
                {!loading && !error && (
                    <div className="flex items-center gap-3">
                        <Link href="/trips/start" className="btn-success">
                            <Image className="h-4 w-4 invert" src="/img/add.png" width={16} height={16} alt="" />
                            Start Trip
                        </Link>
                        <Link href="/trips/add" className="btn-primary">
                            <Image className="h-4 w-4 invert" src="/img/add.png" width={16} height={16} alt="" />
                            Add Trip
                        </Link>
                    </div>
                )}
            </div>

            {loading && <Spinner label="Loading trips..." />}

            {error && <div className="alert-error">{error}</div>}

            {!loading && !error && (
                <Trips trips={trips ?? []} onDelete={reload} />
            )}
        </div>
    );
}

export default function TripsPage() {
    return (
        <Suspense fallback={<Spinner />}>
            <TripsList />
        </Suspense>
    )
}