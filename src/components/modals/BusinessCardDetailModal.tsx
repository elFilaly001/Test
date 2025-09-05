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

interface BusinessCardDetailModalProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
}

function BusinessCardDetailModal({ business, isOpen, onClose }: BusinessCardDetailModalProps) {
  if (!isOpen || !business) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{business.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col items-center text-center">
          <img
            src={business.image}
            alt={business.name}
            className="w-40 h-40 object-cover rounded-full mb-6 border-4 border-blue-200 shadow-lg"
          />
          <p className="text-blue-600 font-semibold text-lg mb-2">{business.domain}</p>
          <p className="text-gray-600 text-base mb-4">{business.description}</p>
          <p className="text-green-600 font-medium text-lg mb-2">📍 {business.city}</p>
          <p className="text-gray-700 text-sm mb-2">
            Location: {business.location.latitude.toFixed(4)}, {business.location.longitude.toFixed(4)}
          </p>
          {business.distance !== undefined && (
            <p className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
              Distance: {business.distance.toFixed(2)} km
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BusinessCardDetailModal;