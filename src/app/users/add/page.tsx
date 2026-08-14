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
			await postUser(name)
            router.push('/users')
		} catch (err) {
		  setError("Failed to add user");
		}
	  };

    return (
      <div className="page-container-narrow py-8">
          <div className="panel">
              {error && <div className="alert-error mb-4">{error}</div>}

              <h1 className="text-xl font-bold text-slate-900 mb-6">
                  Add User
              </h1>

              <form className="space-y-5" onSubmit={addUser}>
                  <div>
                      <label className="field-label">Name</label>
                      <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="field-input"
                          placeholder="e.g. Jane Doe"
                          required
                      />
                  </div>
                  <button type="submit" className="btn-success w-full">Add User</button>
              </form>
          </div>
      </div>
    );
}