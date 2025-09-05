import React, { useState } from "react";

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
}

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBusiness: (business: Business) => void;
}

function AddBusinessModal({ isOpen, onClose, onAddBusiness }: AddBusinessModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    city: "",
    domain: "",
  });

  // Generate random image URL and location
  const generateRandomImage = () => `https://picsum.photos/150/150?random=${Math.floor(Math.random() * 1000) + 13}`;
  const generateRandomLocation = () => ({
    latitude: (Math.random() * 180 - 90), // -90 to 90
    longitude: (Math.random() * 360 - 180), // -180 to 180
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const business: Business = {
      name: formData.name,
      description: formData.description,
      image: generateRandomImage(),
      location: generateRandomLocation(),
      city: formData.city,
      domain: formData.domain,
    };
    onAddBusiness(business);
    setFormData({
      name: "",
      description: "",
      city: "",
      domain: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Business</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
              Domain
            </label>
            <select
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a domain</option>
              <option value="Food">Food</option>
              <option value="Retail">Retail</option>
              <option value="Technology">Technology</option>
              <option value="Arts">Arts</option>
              <option value="Health">Health</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Services">Services</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Business
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBusinessModal;
