"use client";

import { useState, useEffect } from "react";
import { postTrip } from "@/lib/trips";
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { getUsers } from "@/lib/users";

type User = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export default function StartTrip() {
	const [userId, setUserId] = useState("");
    const [isCarpool, setIsCarpool] = useState(false);
	const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const initialUsers = await getUsers();
                setUsers(initialUsers);
            } catch (err) {
                setError("Failed to fetch users");
            }
        }
        fetchUsers();
    }, []);

	const startTrip = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
	
		try {
			postTrip(userId, "80", isCarpool, new Date().toISOString(), new Date().toISOString())
            router.push('/trips')
		} catch (err) {
		  setError("Failed to start trip");
		}
	  };

    return (
      
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
	        <div className="w-full bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
		        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                    {error && <div className="text-red-500 mt-2">{error}</div>}
            
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Start Trip
                    </h1>

                    <form className="space-y-4 md:space-y-6" onSubmit={startTrip}>
                    <button
                            onClick={() => setIsOpen(!isOpen)}
                            id="dropdownUsersButton"
                            className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            type="button"
                        >
                            Users <svg className="w-2.5 h-2.5 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div id="dropdownUsers" className={`z-10 bg-white rounded-lg shadow w-60 ${!isOpen ? 'hidden' : ''}`}>
                            <ul className="h-28 py-2 overflow-y-auto text-gray-700" aria-labelledby="dropdownUsersButton">
                                {users.map(user => (
                                    <li key={user.id}>
                                        <div
                                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setUserId(user.id);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <Image
                                                className="w-6 h-6 me-2 rounded-full"
                                                src={"/img/driver.png"}
                                                width={500}
                                                height={500}
                                                alt={user.name}
                                            />
                                            {user.name}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                        {userId && (
                            <label className="block mb-2 text-sm font-medium text-gray-900">User {userId}</label>
                        )}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Carpool</label>
                            <input 
                                type="checkbox"
                                checked={isCarpool}
                                onChange={(e) => setIsCarpool(e.target.checked)}
                                className="bg-gray-100 border-gray-300 rounded focus:ring-blue-600"
                                placeholder=""
                            />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out bg-green-500 text-white hover:bg-green-600">Start Trip</button>
                    </form>
                    
		        </div>
	        </div>
        </div>
    );
}