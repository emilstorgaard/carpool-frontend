"use client"

import { useState, useEffect, Suspense } from 'react';
import { Spinner } from "@/components/Spinner";
import { getTrips } from "@/lib/trips";
import Trips from "@/components/Trips";

type Trip = {
    id: string;
    userId: string;
    distance: number;
    isCarpool: boolean;
    StartDate: string;
    StopDate: string;
    createdAt: string;
    updatedAt: string;
};

function Trip() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTrips() {
            setLoading(true);
            try {
                const initialTrips = await getTrips();
                setTrips(initialTrips);
            } catch (err) {
                setError("Failed to fetch trips");
            } finally {
                setLoading(false);
            }
        }
        fetchTrips();
    }, []);

    const reloadTrips = () => {
        async function fetchTrips() {
            setLoading(true);
            try {
                const initialTrips = await getTrips();
                setTrips(initialTrips);
            } catch (err) {
                setError("Failed to fetch trips");
            } finally {
                setLoading(false);
            }
        }
        fetchTrips();
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
                    <Trips trips={trips} onDelete={reloadTrips} />
                </>
            )}
        </div>
    );
}

export default function TripsPage() {
    return (
        <Suspense fallback={<Spinner />}>
            <Trip />
        </Suspense>
    )
}