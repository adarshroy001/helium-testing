import { Suspense } from 'react';
import HeliumShopClient from './HeliumShopClient';
import { BackendProduct } from '@/types/types';
import { transformBackendProducts } from '@/lib/productTransformer';
const baseUrl = process.env.INTERNAL_API_URL || 'http://localhost:3000';

interface ShopPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Loading component
function ShopLoading() {
  return (
    <div className="min-h-screen bg-[#101010] text-white pt-20 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-white bg-clip-text text-transparent mb-2 md:mb-4">
            Choose your Helium
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
            Loading products...
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  try {
    // Await the searchParams promise
    const resolvedSearchParams = await searchParams;
    
    // Fetch products from your backend API
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store', // This ensures SSR behavior
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`, // Optional
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    const backendProducts: BackendProduct[] = data.products;
    
    // Transform backend products to frontend format
    const transformedProducts = transformBackendProducts(backendProducts);
    
    return (
      <Suspense fallback={<ShopLoading />}>
        <HeliumShopClient 
          initialProducts={transformedProducts}
          searchParams={resolvedSearchParams}
        />
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    
    return (
      <div className="min-h-screen bg-[#101010] text-white pt-20 pb-20">
        <div className="relative z-10 max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-white bg-clip-text text-transparent mb-2 md:mb-4">
              Choose your Helium
            </h1>
            <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
              Unable to load products. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export const metadata = {
  title: 'Helium Shop - Smart Air Conditioners',
  description: 'Experience the future of cooling with our next-generation smart air conditioners',
};