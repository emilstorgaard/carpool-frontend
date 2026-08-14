"use client"

import TripListItem from "@/components/TripListItem";
import type { Trip } from "@/types";

interface PageProps {
    trips: Trip[];
    onDelete: () => void;
}

const Trips: React.FC<PageProps> = ({ trips, onDelete }) => {
    if (trips.length === 0) {
        return (
            <div className="empty-state">
                <p className="font-medium text-slate-700">No trips yet</p>
                <p className="text-sm">Start or add a trip to see it here.</p>
            </div>
        );
    }

    return (
        <ul className="space-y-3">
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
    );
}

export default Trips;