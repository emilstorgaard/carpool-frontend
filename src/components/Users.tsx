"use client"

import UserListItem from "@/components/UserListItem";

type User = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

interface PageProps {
    users: User[];
    onDelete: () => void;
}

const Users: React.FC<PageProps> = ({ users, onDelete }) => {
    return (
        <div className="container mx-auto px-4 pb-8">

            <ul className="mx-auto divide-y divide-gray-200">
                {users.map((user: User) => (
                    <UserListItem
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        onDelete={onDelete}
                    />
                ))}
            </ul>

        </div>
    );
}

export default Users;