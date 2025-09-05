import { useEffect, useState } from "react";
import BusinessCard from "../components/BusinessCard";
import BusinessCardDetailModal from "../components/modals/BusinessCardDetailModal";
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

  return (
    <div>
      <h1>Business Page</h1>
      <div className="business-list flex flex-wrap justify-center ">
        {businesses.map((business, index) => (
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
