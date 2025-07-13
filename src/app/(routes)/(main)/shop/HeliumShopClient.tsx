// app/shop/HeliumShopClient.tsx (Now much cleaner)
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types/types';
import { getAvailableTonnages, getAvailableStars } from '@/lib/productTransformer';

// Import the new components
import ShopHeader from './components/ShopHeader';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';

interface HeliumShopClientProps {
  initialProducts: Product[];
}

const HeliumShopClient: React.FC<HeliumShopClientProps> = ({
  initialProducts
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedFilter, setSelectedFilter] = useState<string>('All Products');
  const [sortBy, setSortBy] = useState<string>('Popular');
  const router = useRouter();

  // All filtering and sorting logic remains here in the parent component.
  useEffect(() => {
    let filtered = [...initialProducts];

    if (selectedFilter !== 'All Products' && !selectedFilter.startsWith('---')) {
      if (selectedFilter.includes('⭐')) {
        const starValue = parseInt(selectedFilter.replace('⭐ & Above', ''));
        filtered = filtered.filter(product => product.stars >= starValue);
      } else if (selectedFilter.includes('Ton')) {
        filtered = filtered.filter(product => product.tonnage === selectedFilter);
      }
    }

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
      default:
        filtered.sort((a, b) => {
          const aPopular = a.isBestseller || a.tag === 'Popular' ? 1 : 0;
          const bPopular = b.isBestseller || b.tag === 'Popular' ? 1 : 0;
          return bPopular - aPopular;
        });
    }

    setFilteredProducts(filtered);
  }, [initialProducts, selectedFilter, sortBy]);

  const availableTonnages = getAvailableTonnages(initialProducts);
  const availableStars = getAvailableStars(initialProducts);

  const handleProductSelect = (product: Product) => {
    router.push(`/shop/${product.backendId}`);
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white pt-20 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
        <ShopHeader />

        <FilterBar
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          availableTonnages={availableTonnages}
          availableStars={availableStars}
        />

        <ProductGrid 
          products={filteredProducts} 
          onProductSelect={handleProductSelect} 
        />
      </div>
    </div>
  );
};

export default HeliumShopClient;
