import { useEffect, useState } from "react";
import BusinessCard from "../components/BusinessCard";
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
  distance?: number;
}

function BusinessPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    const userLat = data.user.location.latitude;
    const userLon = data.user.location.longitude;
    const businessesWithDistance = data.businesses.map((business: Business) => ({
      ...business,
      distance: calculateDistance(userLat, userLon, business.location.latitude, business.location.longitude)
    }));
    setBusinesses(businessesWithDistance);
  }, []);

  return (
    <div>
      <h1>Business Page</h1>
      <div className="business-list flex flex-wrap justify-center ">
        {businesses.map((business, index) => (
          <BusinessCard key={index} business={business} />
        ))}
      </div>
    </div>
  );
}

export default BusinessPage;
