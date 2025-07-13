// app/shop/page.tsx (Final Recommended Version)

import HeliumShopClient from './HeliumShopClient';
import { transformBackendProducts } from '@/lib/productTransformer';
import type { Product } from '@/types/types';

// This data-fetching function uses fetch to enable caching.
async function getProducts(): Promise<Product[]> {
  try {
    // Ensure your environment variable is set in .env.local
    // NEXT_PUBLIC_API_URL=http://localhost:3000
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products`;

    // This fetch call will be cached.
    const res = await fetch(apiUrl, {
      next: {
        // Here is your 5-minute cache setting (300 seconds).
        revalidate: 300,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data = await res.json();
    
    // Your existing transformation logic
    const transformed = transformBackendProducts(data.products);
    return transformed;
    
  } catch (error) {
    console.error('Failed to fetch and transform products:', error);
    return [];
  }
}

// The page component calls the fetching function.
export default async function ShopPage() {
  const allProducts = await getProducts();
  return <HeliumShopClient initialProducts={allProducts} />;
}

// Your metadata remains the same.
export const metadata = {
  title: 'Helium Shop - Smart Air Conditioners',
  description: 'Experience the future of cooling with our next-generation smart air conditioners',
};
