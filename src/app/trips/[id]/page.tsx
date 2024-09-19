"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getTrip } from "@/lib/trips";
import { Spinner } from "@/components/Spinner";
import { getDateTime } from "@/lib/dateTime";
import { deleteTrip } from "@/lib/trips";
import { useRouter } from 'next/navigation'

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

export default function Trip({ params }: { params: { id: string } }) {
    const [trip, setTrip] = useState<Trip>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        async function fetchTrip() {
            try {
                const initialTrip = await getTrip(params.id);
                setTrip(initialTrip);
            } catch (err) {
                setError("Failed to fetch trip");
            } finally {
                setLoading(false);
            }
        }
        fetchTrip();
    }, [params.id]);

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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 mb-4">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                    {loading && (
                        <div className="flex justify-center">
                            <Spinner />
                        </div>
                    )}

                    {error && <div className="text-red-500 mt-2">{error}</div>}

                    {!loading && !error && (
                        <>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Trip
                            </h1>

                            <label>{trip?.id}</label>
                            
                            <div className='flex justify-center items-center'>
                                <div className="relative w-48 h-48">
                                    <Image
                                        className="object-cover rounded-t-lg"
                                        src="/img/road.png"
                                        layout="fill"
                                        alt={trip?.id || "trip"}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 fon">User</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{trip?.userId}</label>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 fon">Distance</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{trip?.distance} km</label>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 fon">Carpool</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{trip?.isCarpool ? 'Yes' : 'No'}</label>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 fon">Start</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{getDateTime(trip?.startDate)}</label>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 fon">Stop</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{getDateTime(trip?.stopDate)}</label>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900">Created At</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{getDateTime(trip?.createdAt)}</label>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900">Updated At</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{getDateTime(trip?.updatedAt)}</label>
                            </div>
                            <div className="flex justify-between items-center">
                                <Link href={`/trips/${params.id}/edit`} className="text-blue-500 hover:text-blue-700 font-bold rounded-md transition duration-300 ease-in-out">
                                    Edit
                                </Link>
                                {isDeleting ? (
                                    <p className="text-red-500 font-bold">Deleting...</p>
                                ) : (
                                    <button onClick={confirmDelete} className="text-red-500 hover:text-red-700 font-bold rounded-md transition duration-300 ease-in-out">
                                        Delete
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                </div>
            </div>

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Passengers</h5>

        </div>
    )
}