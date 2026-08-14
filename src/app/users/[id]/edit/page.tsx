"use client";

import { useState, useEffect } from "react";
import { putUser } from "@/lib/users";
import { useRouter } from 'next/navigation'
import { getUser } from "@/lib/users";
import { Spinner } from "@/components/Spinner";

export default function EditUser({ params }: { params: { id: string } }) {
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const initialUser = await getUser(params.id);
                setName(initialUser.name)
            } catch (err) {
                setError("Failed to fetch user");
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [params.id]);


	const editUser = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
	
		try {
			await putUser(params.id, name)
            router.push('/users')
		} catch (err) {
		  setError("Failed to edit user");
		}
	  };

    return (
      <div className="page-container-narrow py-8">
          <div className="panel">
              {loading && <Spinner label="Loading user..." />}

              {error && <div className="alert-error mb-4">{error}</div>}

              {!loading && !error && (
              <>
              <h1 className="text-xl font-bold text-slate-900 mb-6">
                  Edit User
              </h1>

              <form className="space-y-5" onSubmit={editUser}>
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
                  <button type="submit" className="btn-primary w-full">Save Changes</button>
              </form>
              </>
              )}
          </div>
      </div>
    );
}