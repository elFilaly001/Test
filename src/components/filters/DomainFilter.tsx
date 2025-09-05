import React from 'react';

interface DomainFilterProps {
    selectedDomain: string | null;
    onDomainChange: (domain: string | null) => void;
}

const DomainFilter: React.FC<DomainFilterProps> = ({ selectedDomain, onDomainChange }) => {
    const domains = [
        { value: null, label: 'All Domains', icon: '📂' },
        { value: 'Food', label: 'Food & Beverage', icon: '🍽️' },
        { value: 'Retail', label: 'Retail', icon: '🛍️' },
        { value: 'Technology', label: 'Technology', icon: '💻' },
        { value: 'Arts', label: 'Arts & Culture', icon: '🎨' },
        { value: 'Health', label: 'Health & Fitness', icon: '🏃' },
        { value: 'Hospitality', label: 'Hospitality', icon: '🏨' },
        { value: 'Services', label: 'Services', icon: '🔧' },
    ];

    return (
        <div className="">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="relative">
                    <select
                        id="domain-select"
                        value={selectedDomain || ''}
                        onChange={(e) => {
                            const value = e.target.value === '' ? null : e.target.value;
                            onDomainChange(value);
                        }}
                        className="appearance-none w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                    >
                        {domains.map((domain) => (
                            <option key={domain.label} value={domain.value || ''}>
                                {domain.icon} {domain.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                
                {selectedDomain && (
                    <div className="mt-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">
                            Showing {selectedDomain} businesses
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DomainFilter;
