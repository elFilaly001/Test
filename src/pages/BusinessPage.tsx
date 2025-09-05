import { useEffect, useState } from "react";
import BusinessCard from "../components/BusinessCard";
import BusinessCardDetailModal from "../components/modals/BusinessCardDetailModal";
import AddBusinessModal from "../components/modals/AddBusinessModal";
import DistanceFilter from "../components/filters/DistenceFilter";
import CityFilter from "../components/filters/CityFilter";
import DomainFilter from "../components/filters/DomainFilter";
import SearchInput from "../components/filters/SearchInput";
import { calculateDistance } from "../services/CalculateDistence";
import AxiosService from "../services/AxiosService";
import data from "../../data.json";

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

function BusinessPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const userLat = data.user.location.latitude;
    const userLon = data.user.location.longitude;
    const businessesWithDistance = data.businesses.map((business: Business) => ({
      ...business,
      distance: calculateDistance(userLat, userLon, business.location.latitude, business.location.longitude)
    }));
    setBusinesses(businessesWithDistance);
  }, []);

  const openModal = (business: Business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBusiness(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddBusiness = async (newBusiness: Business) => {
    try {
      // Post to json server
      await AxiosService.post('/businesses', newBusiness);
      
      // Add to local state with distance calculation
      const userLat = data.user.location.latitude;
      const userLon = data.user.location.longitude;
      const businessWithDistance = {
        ...newBusiness,
        distance: calculateDistance(userLat, userLon, newBusiness.location.latitude, newBusiness.location.longitude)
      };
      setBusinesses(prev => [...prev, businessWithDistance]);
    } catch (error) {
      console.error('Error adding business:', error);
      // You might want to show an error message to the user here
    }
  };

  const filteredBusinesses = businesses.filter(business => {
    const distanceMatch = !selectedDistance || (business.distance && business.distance <= selectedDistance);
    const cityMatch = !selectedCity || business.city === selectedCity;
    const domainMatch = !selectedDomain || business.domain === selectedDomain;
    const searchMatch = !searchTerm ||
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.domain.toLowerCase().includes(searchTerm.toLowerCase());
    return distanceMatch && cityMatch && domainMatch && searchMatch;
  });

  return (
    <div>
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <DistanceFilter selectedDistance={selectedDistance} onDistanceChange={setSelectedDistance} />
            <CityFilter selectedCity={selectedCity} onCityChange={setSelectedCity} />
            <DomainFilter selectedDomain={selectedDomain} onDomainChange={setSelectedDomain} />
          </div>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Business
          </button>
        </div>
      </div>
      <div className="business-list flex flex-wrap justify-center ">
        {filteredBusinesses.map((business, index) => (
          <BusinessCard key={index} business={business} onClick={() => openModal(business)} />
        ))}
      </div>
      <BusinessCardDetailModal
        business={selectedBusiness}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <AddBusinessModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAddBusiness={handleAddBusiness}
      />
    </div>
  );
}

export default BusinessPage;
