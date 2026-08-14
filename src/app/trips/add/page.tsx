"use client";

import { useState } from "react";
import { postTrip } from "@/lib/trips";
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { getUsers } from "@/lib/users";
import { useAsyncData } from "@/hooks/useAsyncData";

export default function AddTrip() {
	const [userId, setUserId] = useState("");
	const [distance, setDistance] = useState("");
    const [isCarpool, setIsCarpool] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [stopDate, setStopDate] = useState("");
	const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false);
    const { data: users } = useAsyncData(getUsers, [], "Failed to fetch users");

	const addTrip = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
	
		try {
			await postTrip(userId, Number(distance), isCarpool, startDate, stopDate)
            router.push('/trips')
		} catch (err) {
		  setError("Failed to add trip");
		}
	  };

    return (
      <div className="page-container-narrow py-8">
          <div className="panel">

                    {error && <div className="alert-error mb-4">{error}</div>}

                    <h1 className="text-xl font-bold text-slate-900 mb-6">
                        Add Trip
                    </h1>

                    <form className="space-y-5" onSubmit={addTrip}>
                        <div>
                            <label className="field-label">User</label>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                id="dropdownUsersButton"
                                className="btn-secondary w-full justify-between"
                                type="button"
                            >
                                {userId ? users?.find(u => u.id === userId)?.name ?? userId : 'Select a user'}
                                <svg className="w-2.5 h-2.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            {isOpen && (
                                <div id="dropdownUsers" className="mt-2 card shadow-card-hover">
                                    <ul className="max-h-40 py-1 overflow-y-auto text-slate-700" aria-labelledby="dropdownUsersButton">
                                        {(users ?? []).map(user => (
                                            <li key={user.id}>
                                                <div
                                                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 cursor-pointer"
                                                    onClick={() => {
                                                        setUserId(user.id);
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    <Image
                                                        className="w-6 h-6 rounded-full"
                                                        src={"/img/driver.png"}
                                                        width={24}
                                                        height={24}
                                                        alt={user.name}
                                                    />
                                                    {user.name}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="field-label">Distance (km)</label>
                            <input
                                type="number"
                                min="0"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                className="field-input"
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                id="isCarpool"
                                type="checkbox"
                                checked={isCarpool}
                                onChange={(e) => setIsCarpool(e.target.checked)}
                                className="field-checkbox"
                            />
                            <label htmlFor="isCarpool" className="text-sm font-medium text-slate-700">Carpool</label>
                        </div>
                        <div>
                            <label className="field-label">Start Date</label>
                            <input
                                type="datetime-local"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="field-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="field-label">Stop Date</label>
                            <input
                                type="datetime-local"
                                value={stopDate}
                                onChange={(e) => setStopDate(e.target.value)}
                                className="field-input"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-success w-full">Add Trip</button>
                    </form>
          </div>
      </div>
    );
}