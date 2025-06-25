'use client'
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/Others/ProductCard';
import type { Product, FilterDropdownProps} from '@/types/types';
import { products } from '@/mockdata/products';

const HeliumShop: React.FC = () => {
  const [tonnageFilter, setTonnageFilter] = useState<string>('All Tonnage');
  const [starFilter, setStarFilter] = useState<string>('All Ratings');
  const [sortBy, setSortBy] = useState<string>('Popular');
  const router = useRouter();

  const handleProductSelect = (product: Product) => {
    router.push(`/shop/${product.id}`);
  };

  const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, value, setValue, options }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900/20 backdrop-blur-sm border border-gray-700/30 rounded-xl text-white hover:bg-gray-800/30 transition-all duration-300"
        >
          <span className="text-sm font-medium">{value}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-700/30 rounded-xl shadow-2xl z-50">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setValue(option);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700/50 first:rounded-t-xl last:rounded-b-xl transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white pt-20 pb-20">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-7xl font-bold bg-white bg-clip-text text-transparent mb-2 md:mb-4">
            Choose your Helium
          </h1>
          <p className="text-md md:text-xl text-gray-300 max-w-2xl mx-auto ">
            Experience the future of cooling with our next-generation smart air conditioners
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-12 p-6 bg-gray-900/30 backdrop-blur-md rounded-2xl border border-gray-700/30 relative z-20">
          <FilterDropdown
            label="Tonnage"
            value={tonnageFilter}
            setValue={setTonnageFilter}
            options={['Tonnage', '1 Ton', '1.5 Ton', '2 Ton']}
          />
          
          <FilterDropdown
            label="Star Rating"
            value={starFilter}
            setValue={setStarFilter}
            options={['All Ratings', '3⭐', '4⭐', '5⭐']}
          />
          
          <FilterDropdown
            label="Sort By"
            value={sortBy}
            setValue={setSortBy}
            options={['Popular', 'Price: High to Low', 'Price: Low to High', 'Newest First']}
          />

          <div className="ml-auto hidden md:flex items-center gap-2 text-gray-400">
            <Filter className="w-4 h-4" />
            <span className="text-sm">{products.length} products</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-5 sm:gap-8 ">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={()=>{handleProductSelect(product)}}
            />
          ))}
        </div>

        {/* Load More Button */}
        {/* <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
            Load More Products
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default HeliumShop;