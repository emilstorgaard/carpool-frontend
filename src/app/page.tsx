"use client"

import { Suspense } from 'react';
import { Spinner } from "@/components/Spinner";
import { getTotalStats, getUsersStats } from "@/lib/stats";
import { useAsyncData } from "@/hooks/useAsyncData";
import UsersStats from "@/components/UsersStats";

function TotalStatsFunc() {
  const { data: totalStats, loading: loadingStats, error: statsError } = useAsyncData(getTotalStats, [], "Failed to fetch total stats");
  const { data: usersStats, loading: loadingUsersStats, error: usersStatsError } = useAsyncData(getUsersStats, [], "Failed to fetch users stats");

  const loading = loadingStats || loadingUsersStats;
  const error = statsError || usersStatsError;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">An overview of all carpool activity.</p>
      </div>

      {loading && <Spinner label="Loading stats..." />}

      {error && <div className="alert-error mb-6">{error}</div>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="panel">
              <p className="stat-label">Total Users</p>
              <p className="stat-value text-2xl">{totalStats?.totalUsers}</p>
            </div>
            <div className="panel">
              <p className="stat-label">Total Trips</p>
              <p className="stat-value text-2xl">{totalStats?.totalTrips}</p>
            </div>
            <div className="panel">
              <p className="stat-label">Total Distance</p>
              <p className="stat-value text-2xl">{totalStats?.totalDistance} km</p>
            </div>
            <div className="panel">
              <p className="stat-label">Total Time</p>
              <p className="stat-value text-2xl">{totalStats?.totalTime}</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-slate-900 mb-4">Users Leaderboard</h2>
          <UsersStats usersStats={usersStats ?? []} />
        </>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
      <Suspense fallback={<Spinner />}>
          <TotalStatsFunc />
      </Suspense>
  )
}