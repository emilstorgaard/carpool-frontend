"use client"

import UserStatsGridItem from "@/components/UsersStatsGridItem";
import type { UserTripStats } from "@/types";

interface PageProps {
    usersStats: UserTripStats[];
}

const Users: React.FC<PageProps> = ({ usersStats }) => {
    if (usersStats.length === 0) {
        return (
            <div className="empty-state">
                <p className="font-medium text-slate-700">No stats yet</p>
                <p className="text-sm">Stats will appear once trips have been logged.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {usersStats.map((usersStat: UserTripStats) => (
                    <UserStatsGridItem
                        key={usersStat.userName}
                        userId={usersStat.userId}
                        userName={usersStat.userName}
                        totalTrips={usersStat.totalTrips}
                        totalDistance={usersStat.totalDistance}
                        totalTime={usersStat.totalTime}
                    />
                ))}
        </div>
    );
}

export default Users;