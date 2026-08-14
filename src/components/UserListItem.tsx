import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { deleteUser } from "@/lib/users";

interface UserProps {
    id: string;
    name: string;
    onDelete: () => void;
}

const User: React.FC<UserProps> = ({ id, name, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteUser(id)
            onDelete();
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
        <li className="card card-hover">
            <div className="flex items-center gap-4 p-4">
                <Link href={`/users/${id}`} className="shrink-0">
                    <Image
                        className="w-14 h-14 rounded-full object-cover bg-slate-100"
                        src="/img/driver.png"
                        width={56}
                        height={56}
                        alt={name}
                    />
                </Link>

                <Link href={`/users/${id}`} className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-slate-900 truncate">
                        {name}
                    </p>
                </Link>

                <div className="flex items-center gap-4 shrink-0">
                    <Link href={`/users/${id}/edit`} className="link-action">
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

export default User;