import React from 'react';

interface DistanceFilterProps {
    selectedDistance: number | null;
    onDistanceChange: (distance: number | null) => void;
}

const DistanceFilter: React.FC<DistanceFilterProps> = ({ selectedDistance, onDistanceChange }) => {
    const options = [
        { value: null, label: 'Distance', icon: '🌍' },
        { value: 10, label: '10 km', icon: '📍' },
        { value: 15, label: '15 km', icon: '📍' },
        { value: 25, label: '25 km', icon: '📍' },
        { value: 50, label: '50 km', icon: '📍' },
    ];

    return (
        <div className="flex-1 min-w-0">
            <div className="relative">
                <select
                    id="distance-select"
                    value={selectedDistance || ''}
                    onChange={(e) => {
                        const value = e.target.value === '' ? null : parseInt(e.target.value);
                        onDistanceChange(value);
                    }}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 cursor-pointer appearance-none"
                >
                    {options.map((option) => (
                        <option key={option.label} value={option.value || ''}>
                            {option.icon} {option.label}
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

export default DistanceFilter;
