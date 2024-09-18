"use client"

import TripListItem from "@/components/TripListItem";

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

interface PageProps {
    trips: Trip[];
    onDelete: () => void;
}

const Trips: React.FC<PageProps> = ({ trips, onDelete }) => {
    return (
        <div className="container mx-auto px-4 pb-8">

            <ul className="mx-auto divide-y divide-gray-200">
                {trips.map((trip: Trip) => (
                    <TripListItem
                        key={trip.id}
                        id={trip.id}
                        userId={trip.userId}
                        distance={trip.distance}
                        isCarpool={trip.isCarpool}
                        startDate={trip.startDate}
                        stopDate={trip.stopDate}
                        onDelete={onDelete}
                    />
                ))}
            </ul>

        </div>
    );
}

export default Trips;