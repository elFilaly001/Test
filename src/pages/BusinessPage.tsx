import { useEffect, useState } from "react";
import BusinessCard from "../components/BusinessCard";
import BusinessCardDetailModal from "../components/modals/BusinessCardDetailModal";
import DistanceFilter from "../components/filters/DistenceFilter";
import CityFilter from "../components/filters/CityFilter";
import DomainFilter from "../components/filters/DomainFilter";
import { calculateDistance } from "../services/CalculateDistence";
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
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

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

  const filteredBusinesses = businesses.filter(business => {
    const distanceMatch = !selectedDistance || (business.distance && business.distance <= selectedDistance);
    const cityMatch = !selectedCity || business.city === selectedCity;
    const domainMatch = !selectedDomain || business.domain === selectedDomain;
    return distanceMatch && cityMatch && domainMatch;
  });

  return (
    <div>
      <div className="filters-container mb-6">
        <DistanceFilter selectedDistance={selectedDistance} onDistanceChange={setSelectedDistance} />
        <CityFilter selectedCity={selectedCity} onCityChange={setSelectedCity} />
        <DomainFilter selectedDomain={selectedDomain} onDomainChange={setSelectedDomain} />
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
    </div>
  );
}

export default BusinessPage;
