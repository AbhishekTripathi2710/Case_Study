import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import AdminLogin from "./AdminLogin";

const fetchProfiles = async () => {
  const response = await fetch("http://localhost:3001/profiles");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function AdminPanel() {
  const queryClient = useQueryClient();
  const { data: profiles, isLoading, error } = useQuery("profiles", fetchProfiles);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const createProfile = useMutation(
    (newProfile) =>
      fetch("http://localhost:3001/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfile),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profiles");
      },
    }
  );

  const updateProfile = useMutation(
    (updatedProfile) =>
      fetch(`http://localhost:3001/profiles/${updatedProfile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profiles");
        setEditingProfile(null);
      },
    }
  );

  const deleteProfile = useMutation(
    (id) =>
      fetch(`http://localhost:3001/profiles/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profiles");
      },
    }
  );

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (isLoading) return <div className="text-center text-gray-600">Loading profiles...</div>;
  if (error) return <div className="text-center text-red-500">An error occurred: {error.message}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel</h1>
      {editingProfile ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile.mutate(editingProfile);
          }}
          className="space-y-4"
        >
          <input
            value={editingProfile.name}
            onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
          <input
            value={editingProfile.description}
            onChange={(e) =>
              setEditingProfile({ ...editingProfile, description: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Save
          </button>
        </form>
      ) : (
        <ul className="space-y-4">
          {profiles?.map((profile) => (
            <li key={profile.id} className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
              <span>{profile.name} - {profile.description}</span>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingProfile(profile)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProfile.mutate(profile.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminPanel;

