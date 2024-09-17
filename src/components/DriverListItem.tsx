import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { deleteDriver } from "@/lib/drivers";

interface DriverProps {
    id: string;
    name: string;
    onDelete: () => void;
}

const Driver: React.FC<DriverProps> = ({ id, name, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteDriver(id)
            onDelete();
        } catch (error) {
            console.error('Error deleting driver:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const confirmDelete = () => {
        if (window.confirm('Are you sure you want to delete this driver?')) {
            handleDelete();
        }
    };

    return (
        <li className="p-4 rounded hover:bg-gray-100 hover:cursor-pointer transition-shadow duration-300 ease-in-out">
            
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Link href={`/drivers/${id}`} className="flex-shrink-0">
                        <div >
                            <Image
                                className="w-16 h-16 rounded"
                                src="/img/driver.png"
                                width={500}
                                height={500}
                                alt={`${name}`}
                            />
                        </div>
                    </Link>

                    <Link href={`/drivers/${id}`} className="flex-1 min-w-0">
                        <div >
                            <p className="text-lg font-medium text-gray-900 truncate">
                                {name}
                            </p>
                        </div>
                    </Link>
                    <div className="inline-flex items-center space-x-6">
                        <Link href={`/drivers/${id}/edit`} className="text-blue-500 hover:text-blue-700 font-bold rounded-md transition duration-300 ease-in-out">
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

export default Driver;