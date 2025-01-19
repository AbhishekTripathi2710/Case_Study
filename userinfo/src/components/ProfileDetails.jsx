import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Map from './Map';

const fetchProfile = async (id) => {
  const response = await fetch(`http://localhost:3001/profiles/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function ProfileDetails() {
  const { id } = useParams();
  const { data: profile, isLoading, error } = useQuery(['profile', id], () => fetchProfile(id));

  if (isLoading) return <div className="text-center text-gray-600">Loading profile...</div>;
  if (error) return <div className="text-center text-red-500">An error occurred: {error.message}</div>;
  if (!profile) return <div className="text-center text-gray-600">Profile not found</div>;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{profile.name}</h1>
          <img src={profile.photo || "/placeholder.svg"} alt={profile.name} className="w-full h-64 object-cover rounded-lg mb-4" />
          <p className="text-gray-600 mb-4">{profile.description}</p>
          <h2 className="text-xl font-bold mb-2 text-gray-800">Contact Information</h2>
          <p className="text-gray-600">Email: {profile.email}</p>
          <p className="text-gray-600">Phone: {profile.phone}</p>
          <h2 className="text-xl font-bold mt-4 mb-2 text-gray-800">Interests</h2>
          <ul className="list-disc list-inside text-gray-600">
            {profile.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 p-6">
          <Map profile={profile} />
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;

