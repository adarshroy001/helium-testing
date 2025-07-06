import { Suspense } from 'react';
import ProductDetailClient from './ProductDetailClient';
import { BackendProduct } from '@/types/types';
import { transformSingleProduct } from '@/lib/productDetailTransformer';

// Loading component for the product detail page
function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading product details...</p>
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  try {
    // Resolve the params first
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    // Fetch the specific product from your backend API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${productId}`, {
      cache: 'no-store', // This ensures SSR behavior
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
              <p className="text-gray-300 mb-6">The product you're looking for doesn't exist.</p>
              <a
                href="/shop"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Products
              </a>
            </div>
          </div>
        );
      }
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const backendProduct: BackendProduct = await res.json();
    
    // Transform the backend product data to work with your existing UI
    const transformedProductVariants = transformSingleProduct(backendProduct);
    
    return (
      <Suspense fallback={<ProductDetailLoading />}>
        <ProductDetailClient 
          productVariants={transformedProductVariants}
          backendProduct={backendProduct}
          productId={productId}
        />
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Product</h1>
          <p className="text-gray-300 mb-6">Something went wrong while loading the product.</p>
          <a
            href="/shop"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </a>
        </div>
      </div>
    );
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${resolvedParams.id}`);
    
    if (res.ok) {
      const product: BackendProduct = await res.json();
      return {
        title: `${product.name} - Helium Smart AC`,
        description: product.description || 'Experience the future of cooling with our smart air conditioner',
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  return {
    title: 'Product Details - Helium',
    description: 'Smart air conditioner details',
  };
}
