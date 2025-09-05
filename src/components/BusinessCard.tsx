import React from "react";

interface Business {
  name: string;
  description: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
  city: string;
  domain: string;
  distance?: number;
}

interface BusinessCardProps {
  business: Business;
  onClick: () => void;
}

function BusinessCard({ business, onClick }: BusinessCardProps) {
  return (
    <div className="min-w-[25%] cursor-pointer" onClick={onClick}>
      <div className="business-card bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl p-6 m-4 border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
        <div className="flex flex-col items-center text-center">
          <img src={business.image} alt={business.name} className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-200 shadow-md" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{business.name}</h2>
          <p className="text-blue-600 font-semibold text-sm mb-1">{business.domain}</p>
          <p className="text-gray-600 text-sm mb-2">{business.description}</p>
          <p className="text-green-600 font-medium text-sm mb-2">📍 {business.city}</p>
          {business.distance !== undefined && (
            <p className="text-gray-500 text-xs mt-2 bg-gray-100 px-2 py-1 rounded-full">Distance: {business.distance.toFixed(2)} km</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
