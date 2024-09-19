"use client"

import { useState, useEffect, Suspense } from 'react';
import { Spinner } from "@/components/Spinner";
import { getTrips } from "@/lib/trips";
import Trips from "@/components/Trips";
import Image from 'next/image';
import Link from 'next/link';

type Trip = {
    id: string;
    userId: string;
    distance: number;
    isCarpool: boolean;
    startDate: string;
    stopDate: string;
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
                    <div className="flex justify-center">
                        <Link href="/trips/start" className="py-2 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-200">
                            <Image className="h-8 w-auto" src="/img/add.png" width={500} height={500} alt="" />
                            Start
                        </Link>
                        <Link href="/trips/add" className="py-2 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-200">
                            <Image className="h-8 w-auto" src="/img/add.png" width={500} height={500} alt="" />
                            Add
                        </Link>
                    </div>
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