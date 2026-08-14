"use client"

import UserListItem from "@/components/UserListItem";
import type { User } from "@/types";

interface PageProps {
    users: User[];
    onDelete: () => void;
}

const Users: React.FC<PageProps> = ({ users, onDelete }) => {
    if (users.length === 0) {
        return (
            <div className="empty-state">
                <p className="font-medium text-slate-700">No users yet</p>
                <p className="text-sm">Add your first user to get started.</p>
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {users.map((user: User) => (
                <UserListItem
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default Users;