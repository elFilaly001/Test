import React from 'react';

interface DistanceFilterProps {
    selectedDistance: number | null;
    onDistanceChange: (distance: number | null) => void;
}

const DistanceFilter: React.FC<DistanceFilterProps> = ({ selectedDistance, onDistanceChange }) => {
    const options = [
        { value: null, label: 'Open', icon: '🌍' },
        { value: 10, label: '10 km', icon: '📍' },
        { value: 15, label: '15 km', icon: '📍' },
        { value: 25, label: '25 km', icon: '📍' },
        { value: 50, label: '50 km', icon: '📍' },
    ];

    return (
        <div className="">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                
                <div className="relative">
                    <select
                        id="distance-select"
                        value={selectedDistance || ''}
                        onChange={(e) => {
                            const value = e.target.value === '' ? null : parseInt(e.target.value);
                            onDistanceChange(value);
                        }}
                        className="appearance-none w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                    >
                        {options.map((option) => (
                            <option key={option.label} value={option.value || ''}>
                                {option.icon} {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                
                {selectedDistance && (
                    <div className="mt-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">
                            Showing businesses within {selectedDistance} km
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistanceFilter;
