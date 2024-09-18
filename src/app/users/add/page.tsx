"use client";

import { useState } from "react";
import { postUser } from "@/lib/users";
import { useRouter } from 'next/navigation'

export default function AddUser() {
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);
    const router = useRouter()

	const addUser = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
	
		try {
			postUser(name)
            router.push('/users')
		} catch (err: any) {
		  setError(err.message);
		}
	  };

    return (
      
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
	        <div className="w-full bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
		        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                    {error && <div className="text-red-500 mt-2">{error}</div>}
            
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Add User
                    </h1>

                    <form className="space-y-4 md:space-y-6" onSubmit={addUser}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                placeholder=""
                                required
                            />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out bg-green-500 text-white hover:bg-green-600">Add User</button>
                    </form>
                    
		        </div>
	        </div>
        </div>
    );
}