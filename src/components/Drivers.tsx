"use client"

import DriverListItem from "@/components/DriverListItem";

type Driver = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

interface PageProps {
    drivers: Driver[];
    onDelete: () => void;
}

const Drivers: React.FC<PageProps> = ({ drivers, onDelete }) => {
    return (
        <div className="container mx-auto px-4 pb-8">

            <ul className="mx-auto divide-y divide-gray-200">
                {drivers.map((driver: Driver) => (
                    <DriverListItem
                        key={driver.id}
                        id={driver.id}
                        name={driver.name}
                        onDelete={onDelete}
                    />
                ))}
            </ul>

        </div>
    );
}

export default Drivers;