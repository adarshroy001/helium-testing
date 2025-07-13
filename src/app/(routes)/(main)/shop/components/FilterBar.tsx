// components/shop/FilterBar.tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FilterDropdownProps } from '@/types/types'; // Assuming this type is defined

interface FilterBarProps {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  availableTonnages: string[];
  availableStars: number[];
}

// The FilterDropdown logic is now encapsulated within the FilterBar
const FilterDropdown: React.FC<FilterDropdownProps & {
  openDropdown: string | null;
  setOpenDropdown: (label: string | null) => void;
  openSubDropdown: string | null;
  setOpenSubDropdown: (label: string | null) => void;
  availableTonnages: string[];
  availableStars: number[];
}> = ({ label, value, setValue, options, openDropdown, setOpenDropdown, openSubDropdown, setOpenSubDropdown, availableTonnages, availableStars }) => {
  const isOpen = openDropdown === label;

  return (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(isOpen ? null : label)}
        className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white text-sm hover:bg-[#2a2a2a] transition-all duration-200"
      >
        <span>{value}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-48 bg-[#1a1a1a] border border-gray-600 rounded-lg shadow-xl z-50">
          {label === 'Filter' ? (
            <div>
              <button
                onClick={() => { setValue('All Products'); setOpenDropdown(null); }}
                className="w-full text-left px-3 py-2 text-white text-sm hover:bg-[#2a2a2a] transition-colors"
              >
                All Products
              </button>
              <div className="relative">
                <button
                  onClick={() => setOpenSubDropdown(openSubDropdown === 'tonnage' ? null : 'tonnage')}
                  className="w-full text-left px-3 py-2 text-white text-sm hover:bg-[#2a2a2a] transition-colors flex items-center justify-between"
                >
                  <span>By Tonnage</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openSubDropdown === 'tonnage' ? 'rotate-180' : '-rotate-90'}`} />
                </button>
                {openSubDropdown === 'tonnage' && (
                  <div className="absolute left-full top-0 ml-1 min-w-32 bg-[#1a1a1a] border border-gray-600 rounded-lg shadow-xl z-50">
                    {availableTonnages.map((tonnage) => (
                      <button key={tonnage} onClick={() => { setValue(tonnage); setOpenDropdown(null); setOpenSubDropdown(null); }}
                        className="w-full text-left px-3 py-2 text-white text-sm hover:bg-[#2a2a2a] transition-colors">
                        {tonnage}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setOpenSubDropdown(openSubDropdown === 'stars' ? null : 'stars')}
                  className="w-full text-left px-3 py-2 text-white text-sm hover:bg-[#2a2a2a] transition-colors flex items-center justify-between"
                >
                  <span>By Star Rating</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openSubDropdown === 'stars' ? 'rotate-180' : '-rotate-90'}`} />
                </button>
                {openSubDropdown === 'stars' && (
                  <div className="absolute left-full top-0 ml-1 min-w-36 bg-[#1a1a1a] border border-gray-600 rounded-lg shadow-xl z-50">
                    {availableStars.map((star) => (
                      <button key={star} onClick={() => { setValue(`${star}⭐ & Above`); setOpenDropdown(null); setOpenSubDropdown(null); }}
                        className="w-full text-left px-3 py-2 text-white text-sm hover:bg-[#2a2a2a] transition-colors">
                        {`${star}⭐ & Above`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {options.map((option) => (
                <button key={option} onClick={() => { setValue(option); setOpenDropdown(null); }}
                  className="w-full text-left px-3 py-2 text-white text-sm hover:bg-[#2a2a2a] transition-colors">
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};


const FilterBar: React.FC<FilterBarProps> = ({
  selectedFilter,
  setSelectedFilter,
  sortBy,
  setSortBy,
  availableTonnages,
  availableStars
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);

  const filterOptions = [
    'All Products',
    '--- By Tonnage ---',
    ...availableTonnages,
    '--- By Star Rating ---',
    ...availableStars.map(star => `${star}⭐ & Above`)
  ];

  return (
    <div className="w-full flex flex-wrap justify-start lg:justify-end gap-3 mb-3 md:mb-8 items-center px-2 md:px-5 xl:px-8">
      <FilterDropdown
        label="Filter"
        value={selectedFilter}
        setValue={setSelectedFilter}
        options={filterOptions}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        openSubDropdown={openSubDropdown}
        setOpenSubDropdown={setOpenSubDropdown}
        availableTonnages={availableTonnages}
        availableStars={availableStars}
      />
      <FilterDropdown
        label="Sort By"
        value={sortBy}
        setValue={setSortBy}
        options={['Popular', 'Price: High to Low', 'Price: Low to High', 'Rating: High to Low', 'Newest First']}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        openSubDropdown={openSubDropdown}
        setOpenSubDropdown={setOpenSubDropdown}
        availableTonnages={[]}
        availableStars={[]}
      />
    </div>
  );
};

export default FilterBar;
