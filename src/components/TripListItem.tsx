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

    console.log(isCarpool)

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
        <li className="p-4 rounded hover:bg-gray-100 hover:cursor-pointer transition-shadow duration-300 ease-in-out">
            
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Link href={`/trips/${id}`} className="flex-shrink-0">
                        <div >
                            <Image
                                className="w-16 h-16 rounded"
                                src="/img/road.png"
                                width={500}
                                height={500}
                                alt={`${id}`}
                            />
                        </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                        <Link href={`/trips/${id}`}>
                            <div>
                                <p className="text-lg font-medium text-gray-900 truncate">
                                    {getDateTime(startDate)}
                                </p>
                                <p className="text-sm text-gray-600 truncate">
                                    {userId}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    Carpool: {isCarpool ? 'Yes' : 'No'}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    {distance} km
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="inline-flex items-center space-x-6">
                        <Link href={`/trips/${id}/edit`} className="text-blue-500 hover:text-blue-700 font-bold rounded-md transition duration-300 ease-in-out">
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
                </div>
        </li>
    );
};

export default Trip;