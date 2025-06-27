'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Bell, ChevronLeft, ChevronRight, FileText, MessageCircle, RotateCcw, Shield, Star, Wrench } from 'lucide-react';
import type { Product } from '@/types/types';
import { products } from '@/mockdata/products';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();
  const [productId, setProductId] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [pincode, setPincode] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle async params in Next.js 15+
  useEffect(() => {
    let isMounted = true;

    const getParams = async () => {
      try {
        const resolvedParams = await params;
        if (isMounted) {
          setProductId(resolvedParams.id);
        }
      } catch (error) {
        console.error('Error resolving params:', error);
        if (isMounted) {
          setError('Failed to load product');
          setProductId('');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getParams();

    return () => {
      isMounted = false;
    };
  }, [params]);

  // Find the product by ID with error handling
  useEffect(() => {
    if (productId) {
      try {
        const foundProduct = products.find((p) => p.id === productId) as Product;
        setProduct(foundProduct);
        if (!foundProduct) {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error finding product:', err);
        setError('Error loading product');
      }
    }
  }, [productId]);

  // Helper function to extract numeric value from price string - memoized
  const extractPrice = useCallback((priceString: string | number): number => {
    if (typeof priceString === 'number') return priceString;
    // Remove ₹ symbol, spaces, and commas, then convert to number
    const cleaned = priceString.replace(/[₹\s,]/g, '');
    return parseInt(cleaned, 10) || 0;
  }, []);

  // Calculate discount using useMemo to prevent unnecessary recalculations
  const { discount, discountPercentage } = useMemo(() => {
    if (!product?.originalPrice) {
      return { discount: 0, discountPercentage: 0 };
    }

    const originalPrice = extractPrice(product.originalPrice);
    const currentPrice = extractPrice(product.price);
    const calculatedDiscount = originalPrice - currentPrice;

    const calculatedDiscountPercentage = originalPrice > 0
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

    return {
      discount: calculatedDiscount,
      discountPercentage: calculatedDiscountPercentage
    };
  }, [product, extractPrice]);

  // Handle checkout - both buttons should work
  const handleCheckout = useCallback(() => {
    if (product) {
      router.push(`/checkout?productId=${productId}&quantity=${quantity}`);
    }
  }, [router, productId, quantity, product]);

  // Handle customize button
  const handleCustomize = useCallback(() => {
    if (product) {
      // You might want to pass different parameters for customization
      router.push(`/customize?productId=${productId}&quantity=${quantity}`);
    }
  }, [router, productId, quantity, product]);

  // Error handling for image loading
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-image.jpg'; // Fallback image
  }, []);

  // Render star rating - memoized component
  const StarRating = useMemo(() => {
    if (!product?.stars) return null;

    return (
      <div className="flex items-center mb-1 md:mb-4">
        <span className="text-gray-300 text-sm md:text-lg mr-1 md:mr-2">Review: </span>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 lg:w-4 lg:h-4 ${i < product.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
              }`}
          />
        ))}
      </div>
    );
  }, [product?.stars]);

  // Color selection buttons - memoized
  const ColorSelection = useMemo(() => {
    if (!product?.colors || product.colors.length === 0) return null;

    return (
      <div className="flex gap-3 justify-center xl:flex-col xl:justify-center xl:items-center">
        {product.colors.map((color, index) => (
          <button
            key={index}
            onClick={() => setSelectedColor(index)}
            className={`w-7 h-7 md:w-10 md:h-10 rounded-full border transition-all ${selectedColor === index ? 'border-white scale-110' : 'border-gray-600'
              }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    );
  }, [product?.colors, selectedColor]);

  // Features section - memoized
  const Features = useMemo(() => (
    <div className="grid grid-cols-3 gap-2 w-full h-full">
      <div className="flex flex-col items-center text-center">
        <div className='p-3 mb-2 bg-[#ffffff14] border border-[#9C9C9C] rounded-full'>
          <Wrench className="w-6 h-6 text-white" />
        </div>
        <div className="text-xs text-white font-semibold">Free Installation</div>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className='p-3 mb-2 bg-[#ffffff14] border border-[#9C9C9C] rounded-full'>
          <RotateCcw className="w-6 h-6 text-white" />
        </div>
        <div className="text-xs text-white font-semibold">10-day free return</div>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className='p-3 mb-2 bg-[#ffffff14] border border-[#9C9C9C] rounded-full'>
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div className="text-xs text-white font-semibold">3 year warranty</div>
      </div>
    </div>
  ), []);

  // Product badges - memoized
  const ProductBadges = useMemo(() => {
    if (!product) return null;

    const badges = [];

    if (product.isNew) {
      badges.push(
        <div key="new" className="absolute top-4 left-4 px-3 py-1 bg-[#28a57f] text-white text-xs font-bold rounded-full">
          NEW
        </div>
      );
    }

    if (product.isBestseller) {
      badges.push(
        <div key="bestseller" className="absolute top-4 left-4 px-3 py-1 bg-[#28a57f] text-white text-xs font-bold rounded-full">
          BESTSELLER
        </div>
      );
    }

    if (product.isPremium) {
      badges.push(
        <div key="premium" className="absolute top-4 left-4 px-3 py-1 bg-[#28a57f] text-white text-xs font-bold rounded-full">
          PREMIUM
        </div>
      );
    }

    return badges;
  }, [product?.isNew, product?.isBestseller, product?.isPremium]);

  // MOVED: Show loading state - AFTER all hooks are defined
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  // MOVED: Show error state - AFTER all hooks are defined
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{error || 'Product Not Found'}</h1>
          <button
            onClick={() => router.push('/shop')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden ">
      {/* Smaller + lg Screen */}
      <div className="relative block xl:hidden max-w-4xl z-10  mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-6 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-6">
        <div className="flex flex-col xl:flex-row gap-4">
          {/* Left Side - Product Images */}
          <div className="rounded-2xl md:rounded-3xl">
            {/* Main Product Image */}
            <div className="relative h-96 sm:h-[420px] md:h-[450px] lg:h-[480px] xl:h-64 overflow-hidden rounded-2xl md:rounded-3xl">
              <div
                className="w-full h-full flex items-center justify-center text-white font-bold text-2xl"
                style={{
                  backgroundImage: 'url(https://t4.ftcdn.net/jpg/00/98/59/35/360_F_98593539_L3cNIqMZT511Qoz2DXe31xBAqMqPYdGj.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110 scale-110 sm:scale-100"
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>
              {/* Badges */}
              {ProductBadges}
            </div>
          </div>

          {/* Color Selection */}
          {ColorSelection}

          {/* Right Side - Product Details */}
          <div className="bg-[#1f1f1f] rounded-2xl md:rounded-3xl border border-[rgba(255,255,255,0.15)] pt-6 pb-3 px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="mb-6">
              <h1 className="text-lg md:text-xl font-medium text-white mb-1">{product.name}</h1>

              {/* Tonnage */}
              {product.tonnage && (
                <div className="text-gray-300 text-md md:text-lg mb-1">{product.tonnage} • Inverter AC</div>
              )}

              {/* Star Rating */}
              {StarRating}

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg md:text-xl font-semibold text-white">{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-500 line-through text-sm md:text-base">{product.originalPrice}</span>
                    <span className="text-[#28a57f] bg-[#28a57f]/10 rounded-full px-3 py-1 text-sm">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 my-8">
                <button
                  className="w-full bg-[#28a57f] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#228a6f] transition-all duration-300 transform hover:scale-105"
                  onClick={handleCheckout}
                  disabled={!product}
                >
                  Checkout
                </button>
                <button
                  className="w-full bg-[#f5b841] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#e5a839] transition-all duration-300 transform hover:scale-105"
                  onClick={handleCustomize}
                  disabled={!product}
                >
                  Customize your Front Panel
                </button>
              </div>
              <div className="w-full h-px mx-auto my-4 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Features */}
              {Features}
            </div>
          </div>
        </div>
      </div>

      {/* extra Larger Screen */}
      <div className="h-full hidden xl:block w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">
        {/* Bg Image */}
        <div className="w-full h-full rounded-3xl flex"
          style={{
            backgroundImage: 'url(https://t4.ftcdn.net/jpg/00/98/59/35/360_F_98593539_L3cNIqMZT511Qoz2DXe31xBAqMqPYdGj.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Colors-div */}
          <div className="w-[10%] min-h-[86vh] flex flex-col justify-center">
            {ColorSelection}
          </div>

          {/* image-div */}
          <div className="w-[45%] min-h-[86%] flex flex-col justify-center">
            {/* Main Product Image */}
            <div className="h-96 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="w-[45%]  min-h-[86%] flex justify-center items-center overflow-hidden">
            <div className="h-fit max-h-[80%] w-[80%] overflow-hidden bg-[#1f1f1f]/60 rounded-2xl md:rounded-3xl border border-[rgba(255,255,255,0.15)] pt-6 px-4">
              <div className="">
                <h1 className="text-lg md:text-3xl font-medium text-white mb-3">{product.name}</h1>

                {/* Tonnage */}
                {product.tonnage && (
                  <div className="text-gray-300 text-md md:text-xl mb-3">{product.tonnage} | 3 Star | Inverter </div>
                )}

                {/* Star Rating */}
                {StarRating}

                {/* Price */}
                <div className="flex items-center gap-2 mb-4 md:mb-8">
                  <span className="text-xl md:text-2xl font-semibold text-white">{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-500 line-through text-base md:text-lg">{product.originalPrice}</span>
                      <span className="text-[#28a57f] bg-[#28a57f]/10 rounded-full px-3 py-1 text-sm md:text-base">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 my-8">
                  <button
                    className="w-full bg-[#28a57f] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#228a6f] transition-all duration-300 transform active:scale-95 hover:scale-[1.01]"
                    onClick={handleCheckout}
                    disabled={!product}
                  >
                    Checkout
                  </button>
                  <button
                    className="w-full bg-[#f5b841] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#e5a839] transition-all duration-300 transform active:scale-95 hover:scale-[1.01]"
                    onClick={handleCustomize}
                    disabled={!product}
                  >
                    Customize your Front Panel
                  </button>
                </div>
                <div className="w-full h-[2px] mx-auto my-4 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* Features */}
                <div className='min-h-[200px] w-full mb-6'> 
                  {Features}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;