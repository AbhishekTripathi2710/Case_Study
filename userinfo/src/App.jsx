import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProfileList from './components/ProfileList';
import AdminPanel from './components/AdminPanel';
import ProfileDetails from './components/ProfileDetails';

const queryClient = new QueryClient();

function App() {
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "ronalabhishek@gmail.com" }),
      });
      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent successfully!");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending OTP.");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="flex items-center">
                <span className="font-bold text-xl text-gray-800">Profile Map App</span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-800 transition duration-300">Home</Link>
                {otpSent ? (
                  <Link to="/admin" className="text-gray-600 hover:text-gray-800 transition duration-300">Admin</Link>
                ) : (
                  <button onClick={sendOtp} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ProfileList />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/profile/:id" element={<ProfileDetails />} />
          </Routes>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;

