"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getUser } from "@/lib/users";
import { getUserStats } from "@/lib/stats";
import { Spinner } from "@/components/Spinner";
import { getDateTime } from "@/lib/dateTime";
import { deleteUser } from "@/lib/users";
import { useRouter } from 'next/navigation'

type User = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

type UserStats = {
    totalTrips: number;
    totalDistance: number;
    totalTime: string
}

export default function User({ params }: { params: { id: string } }) {
    const [user, setUser] = useState<User>();
    const [userStats, setUserStats] = useState<UserStats>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        async function fetchUser() {
            try {
                const initialUser = await getUser(params.id);
                setUser(initialUser);
            } catch (err) {
                setError("Failed to fetch user");
            } finally {
                setLoading(false);
            }
        }
        fetchUser();

        async function fetchUserStats() {
            try {
                const userStats = await getUserStats(params.id);
                setUserStats(userStats);
            } catch (err) {
                setError("Failed to fetch user stats");
            } finally {
                setLoading(false);
            }
        }
        fetchUserStats();
    }, [params.id]);

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
                                User
                            </h1>

                            <label>{user?.id}</label>
                            
                            <div className='flex justify-center items-center'>
                                <div className="relative w-48 h-48">
                                    <Image
                                        className="object-cover rounded-t-lg"
                                        src="/img/driver.png"
                                        layout="fill"
                                        alt={user?.name || "user"}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 fon">Name</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{user?.name}</label>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900">Created At</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{getDateTime(user?.createdAt)}</label>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900">Updated At</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{getDateTime(user?.updatedAt)}</label>
                            </div>
                            <div className="flex justify-between items-center">
                                <Link href={`/users/${params.id}/edit`} className="text-blue-500 hover:text-blue-700 font-bold rounded-md transition duration-300 ease-in-out">
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

            
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {loading && (
                        <div className="flex justify-center">
                            <Spinner />
                        </div>
                    )}

                    {error && <div className="text-red-500 mt-2">{error}</div>}

                    {!loading && !error && (
                        <>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900 fon">Total Trips</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{userStats?.totalTrips}</label>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900">Total Distance</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{userStats?.totalDistance}</label>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900">Total Time</label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{userStats?.totalTime}</label>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}