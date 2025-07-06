'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/Others/ProductCard';
import type { Product, FilterDropdownProps} from '@/types/types';
import { getAvailableTonnages, getAvailableStars } from '@/lib/productTransformer';

interface HeliumShopClientProps {
  initialProducts: Product[];
   searchParams?: { [key: string]: string | string[] | undefined };
}

const HeliumShopClient: React.FC<HeliumShopClientProps> = ({ 
  initialProducts, 
  searchParams 
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedFilter, setSelectedFilter] = useState<string>('All Products');
  const [sortBy, setSortBy] = useState<string>('Popular');
  const router = useRouter();

  // Generate dynamic filter options from actual data
  const availableTonnages = getAvailableTonnages(allProducts);
  const availableStars = getAvailableStars(allProducts);

  // Combined filter options
  const filterOptions = [
    'All Products',
    '--- By Tonnage ---',
    ...availableTonnages,
    '--- By Star Rating ---',
    ...availableStars.map(star => `${star}⭐ & Above`)
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.relative')) {
        setOpenDropdown(null);
        setOpenSubDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Apply filtering and sorting whenever filters change
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply filter
    if (selectedFilter !== 'All Products' && !selectedFilter.startsWith('---')) {
      if (selectedFilter.includes('⭐')) {
        // Star rating filter
        const starValue = parseInt(selectedFilter.replace('⭐ & Above', ''));
        filtered = filtered.filter(product => product.stars >= starValue);
      } else if (selectedFilter.includes('Ton')) {
        // Tonnage filter
        filtered = filtered.filter(product => product.tonnage === selectedFilter);
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'Price: High to Low':
        filtered.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case 'Price: Low to High':
        filtered.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case 'Newest First':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'Rating: High to Low':
        filtered.sort((a, b) => b.stars - a.stars);
        break;
      default: // Popular
        filtered.sort((a, b) => {
          const aPopular = a.isBestseller || a.tag === 'Popular' ? 1 : 0;
          const bPopular = b.isBestseller || b.tag === 'Popular' ? 1 : 0;
          return bPopular - aPopular;
        });
    }

    setFilteredProducts(filtered);
  }, [allProducts, selectedFilter, sortBy]);

  const handleProductSelect = (product: Product) => {
    router.push(`/shop/${product.backendId}`);
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);

  const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, value, setValue, options }) => {
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
                  onClick={() => {
                    setValue('All Products');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-white text-sm hover:bg-[#2a2a2a] transition-colors"
                >
                  All Products
                </button>
                
                {/* Tonnage Submenu */}
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
                        <button
                          key={tonnage}
                          onClick={() => {
                            setValue(tonnage);
                            setOpenDropdown(null);
                            setOpenSubDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 text-white text-sm hover:bg-[#2a2a2a] transition-colors"
                        >
                          {tonnage}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Star Rating Submenu */}
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
                        <button
                          key={star}
                          onClick={() => {
                            setValue(`${star}⭐ & Above`);
                            setOpenDropdown(null);
                            setOpenSubDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 text-white text-sm hover:bg-[#2a2a2a] transition-colors"
                        >
                          {star}⭐ & Above
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setValue(option);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 text-white text-sm hover:bg-[#2a2a2a] transition-colors"
                  >
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

  return (
    <div className="min-h-screen bg-[#101010] text-white pt-20 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
        {/* Header Section - Exactly same as your original */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-white bg-clip-text text-transparent mb-2 md:mb-4">
            Choose your Helium
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto ">
            Experience the future of cooling with our next-generation smart air conditioners
          </p>
        </div>

        {/* Simple Filter Bar - Like Standard E-commerce Sites */}
        <div className="w-full flex flex-wrap justify-start lg:justify-end gap-3 mb-3 md:mb-8 items-center px-2 md:px-5 xl:px-8">
          {/* Filter Dropdown */}
          <FilterDropdown
            label="Filter"
            value={selectedFilter}
            setValue={setSelectedFilter}
            options={filterOptions}
          />
          
          {/* Sort Dropdown */}
          <FilterDropdown
            label="Sort By"
            value={sortBy}
            setValue={setSortBy}
            options={['Popular', 'Price: High to Low', 'Price: Low to High', 'Rating: High to Low', 'Newest First']}
          />
        </div>

        {/* Product Grid - Exactly same as your original */}
        <div className="w-full !px-auto  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={()=>{handleProductSelect(product)}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeliumShopClient;