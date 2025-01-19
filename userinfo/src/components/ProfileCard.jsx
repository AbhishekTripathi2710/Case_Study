import React from 'react';
import { Link } from 'react-router-dom';

function ProfileCard({ profile, onSummary }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl">
      <img className="w-full h-48 object-cover" src={profile.photo || "/placeholder.svg"} alt={profile.name} />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{profile.name}</h2>
        <p className="text-gray-600 text-sm mb-4">{profile.description}</p>
        <div className="flex justify-between">
          <button 
            onClick={onSummary}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Summary
          </button>
          <Link 
            to={`/profile/${profile.id}`}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

