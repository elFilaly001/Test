import React from 'react';

interface DomainFilterProps {
    selectedDomain: string | null;
    onDomainChange: (domain: string | null) => void;
}

const DomainFilter: React.FC<DomainFilterProps> = ({ selectedDomain, onDomainChange }) => {
    const domains = [
        { value: null, label: 'Category', icon: '📂' },
        { value: 'Food', label: 'Food & Beverage', icon: '🍽️' },
        { value: 'Retail', label: 'Retail', icon: '🛍️' },
        { value: 'Technology', label: 'Technology', icon: '💻' },
        { value: 'Arts', label: 'Arts & Culture', icon: '🎨' },
        { value: 'Health', label: 'Health & Fitness', icon: '🏃' },
        { value: 'Hospitality', label: 'Hospitality', icon: '🏨' },
        { value: 'Services', label: 'Services', icon: '🔧' },
    ];

    return (
        <div className="flex-1 min-w-0">
            <div className="relative">
                <select
                    id="domain-select"
                    value={selectedDomain || ''}
                    onChange={(e) => {
                        const value = e.target.value === '' ? null : e.target.value;
                        onDomainChange(value);
                    }}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 cursor-pointer appearance-none"
                >
                    {domains.map((domain) => (
                        <option key={domain.label} value={domain.value || ''}>
                            {domain.icon} {domain.label}
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

export default DomainFilter;
