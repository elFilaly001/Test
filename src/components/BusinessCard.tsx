import React from "react";

interface Business {
  name: string;
  description: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
  distance?: number;
}

interface BusinessCardProps {
  business: Business;
}

function BusinessCard({ business }: BusinessCardProps) {
  return (
    <div className="min-w-[25%]">
    <div className="business-card bg-white shadow-lg rounded-lg p-6 m-4  border border-gray-200 hover:shadow-xl transition-shadow duration-300 ">
      <div className="flex flex-col items-center text-center  ">
        <img src={business.image} alt={business.name} className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-100" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">{business.name}</h2>
        <p className="text-gray-600 text-sm">{business.description}</p>
        {business.distance !== undefined && (
          <p className="text-gray-500 text-xs mt-2">Distance: {business.distance.toFixed(2)} km</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default BusinessCard;
