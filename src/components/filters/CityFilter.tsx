import React from 'react';

interface CityFilterProps {
    selectedCity: string | null;
    onCityChange: (city: string | null) => void;
}

const CityFilter: React.FC<CityFilterProps> = ({ selectedCity, onCityChange }) => {
    const cities = [
        { value: null, label: 'City', icon: '�️' },
        { value: 'New York', label: 'New York', icon: '🏙️' },
        { value: 'Los Angeles', label: 'Los Angeles', icon: '🌴' },
        { value: 'Chicago', label: 'Chicago', icon: '🏢' },
        { value: 'Houston', label: 'Houston', icon: '⛽' },
        { value: 'Miami', label: 'Miami', icon: '🏖️' },
        { value: 'Seattle', label: 'Seattle', icon: '🌧️' },
        { value: 'Denver', label: 'Denver', icon: '🏔️' },
        { value: 'Phoenix', label: 'Phoenix', icon: '☀️' },
        { value: 'Dallas', label: 'Dallas', icon: '🤠' },
        { value: 'San Francisco', label: 'San Francisco', icon: '🌉' },
    ];

    return (
        <div className="flex-1 min-w-0">
            <div className="relative">
                <select
                    id="city-select"
                    value={selectedCity || ''}
                    onChange={(e) => {
                        const value = e.target.value === '' ? null : e.target.value;
                        onCityChange(value);
                    }}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 cursor-pointer appearance-none"
                >
                    {cities.map((city) => (
                        <option key={city.label} value={city.value || ''}>
                            {city.icon} {city.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CityFilter;
