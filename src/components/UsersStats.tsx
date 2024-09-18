"use client"

import UserStatsGridItem from "@/components/UsersStatsGridItem";

type UsersStat = {
    userId: string;
    userName: string;
    totalTrips: number;
    totalDistance: number;
    totalTime: string;
  };

interface PageProps {
    usersStats: UsersStat[];
}

const Users: React.FC<PageProps> = ({ usersStats }) => {
    return (
        <div className="container mx-auto px-4 pb-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {usersStats.map((usersStat: UsersStat) => (
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

        </div>
    );
}

export default Users;