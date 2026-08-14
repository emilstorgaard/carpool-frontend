import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { deleteTrip } from "@/lib/trips";
import { getDateTime } from '@/lib/dateTime';

interface TripProps {
    id: string;
    userId: string;
    distance: number;
    isCarpool: boolean;
    startDate: string;
    stopDate: string;
    onDelete: () => void;
}

const Trip: React.FC<TripProps> = ({ id, userId, distance, isCarpool, startDate, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteTrip(id)
            onDelete();
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
        <li className="card card-hover">
            <div className="flex items-center gap-4 p-4">
                <Link href={`/trips/${id}`} className="shrink-0">
                    <Image
                        className="w-14 h-14 rounded-full object-cover bg-slate-100"
                        src="/img/road.png"
                        width={56}
                        height={56}
                        alt=""
                    />
                </Link>

                <Link href={`/trips/${id}`} className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-slate-900 truncate">
                        {getDateTime(startDate)}
                    </p>
                    <p className="text-sm text-slate-500 truncate">
                        {userId}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                        <span className={isCarpool ? 'badge-success' : 'badge-neutral'}>
                            {isCarpool ? 'Carpool' : 'Solo'}
                        </span>
                        <span className="text-sm text-slate-500">{distance} km</span>
                    </div>
                </Link>

                <div className="flex items-center gap-4 shrink-0">
                    <Link href={`/trips/${id}/edit`} className="link-action">
                        Edit
                    </Link>
                    {isDeleting ? (
                        <span className="text-sm font-semibold text-red-400">Deleting...</span>
                    ) : (
                        <button onClick={confirmDelete} className="link-danger">
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
};

export default Trip;