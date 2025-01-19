import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ProfileCard from './ProfileCard';
import Map from './Map';
import SearchFilter from './SearchFilter';

const fetchProfiles = async () => {
  const response = await fetch('http://localhost:3001/profiles');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function ProfileList() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: profiles, isLoading, error } = useQuery('profiles', fetchProfiles);

  const filteredProfiles = profiles?.filter(profile => 
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="text-center text-gray-600">Loading profiles...</div>;
  if (error) return <div className="text-center text-red-500">An error occurred: {error.message}</div>;

  return (
    <div className="md:flex">
      <div className="md:w-1/2 p-6">
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {filteredProfiles?.map(profile => (
            <ProfileCard 
              key={profile.id} 
              profile={profile} 
              onSummary={() => setSelectedProfile(profile)}
            />
          ))}
        </div>
      </div>
      <div className="md:w-1/2 p-6">
        <Map profile={selectedProfile} />
      </div>
    </div>
  );
}

export default ProfileList;

