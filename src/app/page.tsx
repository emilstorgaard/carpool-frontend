"use client"

import { useState, useEffect, Suspense } from 'react';
import { Spinner } from "@/components/Spinner";
import { getTotalStats } from "@/lib/stats";
import { getUsersStats } from '@/lib/stats';
import UsersStats from "@/components/UsersStats";

type TotalStats = {
  totalTrips: number;
  totalDistance: number;
  totalUsers: boolean;
  totalTime: string;
};

type UsersStat = {
    userId: string;
    userName: string;
    totalTrips: number;
    totalDistance: number;
    totalTime: string;
  };

function TotalStatsFunc() {
  const [totalStats, setTotalStats] = useState<TotalStats>();
  const [usersStats, setUsersStats] = useState<UsersStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTotalStats() {
        setLoading(true);
        try {
            const initialTotalStats = await getTotalStats();
            setTotalStats(initialTotalStats);
        } catch (err) {
            setError("Failed to fetch total stats");
        } finally {
            setLoading(false);
        }
    }
    fetchTotalStats();

    async function fetchUsersStats() {
        setLoading(true);
        try {
            const initialUsersStats = await getUsersStats();
            setUsersStats(initialUsersStats);
        } catch (err) {
            setError("Failed to fetch users stats");
        } finally {
            setLoading(false);
        }
    }
    fetchUsersStats();
}, []);

  return (
    <>
    <div className="max-w-lg mx-auto mb-4">

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
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Stats</h5>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900">Total Users</label>
                        <label className="block mb-2 text-sm font-medium text-gray-900">{totalStats?.totalUsers}</label>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900 fon">Total Trips</label>
                        <label className="block mb-2 text-sm font-medium text-gray-900">{totalStats?.totalTrips}</label>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900">Total Distance</label>
                        <label className="block mb-2 text-sm font-medium text-gray-900">{totalStats?.totalDistance}</label>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900">Total Time</label>
                        <label className="block mb-2 text-sm font-medium text-gray-900">{totalStats?.totalTime}</label>
                    </div>
                </>
            )}
        </div>
    </div>

  </div>

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
        <UsersStats usersStats={usersStats} />
    </>
)}
</div>
</>
  );
}

export default function HomePage() {
  return (
      <Suspense fallback={<Spinner />}>
          <TotalStatsFunc />
      </Suspense>
  )
}