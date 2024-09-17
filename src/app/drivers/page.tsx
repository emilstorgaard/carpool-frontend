"use client"

import { useState, useEffect, Suspense } from 'react';
import { Spinner } from "@/components/Spinner";
import { getDrivers } from "@/lib/drivers";
import Drivers from "@/components/Drivers";

type Driver = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

function Driver() {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDrivers() {
            setLoading(true);
            try {
                const initialDrivers = await getDrivers();
                setDrivers(initialDrivers);
            } catch (err) {
                setError("Failed to fetch drivers");
            } finally {
                setLoading(false);
            }
        }
        fetchDrivers();
    }, []);

    const reloadDrivers = () => {
        async function fetchDrivers() {
            setLoading(true);
            try {
                const initialDrivers = await getDrivers();
                setDrivers(initialDrivers);
            } catch (err) {
                setError("Failed to fetch drivers");
            } finally {
                setLoading(false);
            }
        }
        fetchDrivers();
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
                    <Drivers drivers={drivers} onDelete={reloadDrivers} />
                </>
            )}
        </div>
    );
}

export default function DriversPage() {
    return (
        <Suspense fallback={<Spinner />}>
            <Driver />
        </Suspense>
    )
}