import React from 'react';

interface CityFilterProps {
    selectedCity: string | null;
    onCityChange: (city: string | null) => void;
}

const CityFilter: React.FC<CityFilterProps> = ({ selectedCity, onCityChange }) => {
    const cities = [
        { value: null, label: 'All Cities', icon: '🌍' },
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
        <div className="">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="relative">
                    <select
                        id="city-select"
                        value={selectedCity || ''}
                        onChange={(e) => {
                            const value = e.target.value === '' ? null : e.target.value;
                            onCityChange(value);
                        }}
                        className="appearance-none w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                    >
                        {cities.map((city) => (
                            <option key={city.label} value={city.value || ''}>
                                {city.icon} {city.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                
                {selectedCity && (
                    <div className="mt-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">
                            Showing businesses in {selectedCity}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CityFilter;
