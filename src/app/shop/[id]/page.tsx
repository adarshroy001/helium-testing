'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Bell, ChevronLeft, ChevronRight, FileText, MessageCircle, RotateCcw, Shield, Star, Wrench } from 'lucide-react';
import type { Product } from '@/types/types';
import { products } from '@/mockdata/products';

interface PageProps {
  params: Promise<{
    id: string;
  }> | {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const [productId, setProductId] = useState<string>('');
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [pincode, setPincode] = useState<string>('');
  const [discount, setDiscount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Handle async params in Next.js 15+
  useEffect(() => {
    const getParams = async () => {
      try {
        const resolvedParams = await Promise.resolve(params);
        setProductId(resolvedParams.id);
      } catch (error) {
        console.error('Error resolving params:', error);
        setProductId('');
      } finally {
        setLoading(false);
      }
    };

    getParams();
  }, [params]);

  // Find the product by ID
  useEffect(() => {
    if (productId) {
      const foundProduct = products.find((p) => p.id === productId) as Product;
      setProduct(foundProduct);
    }
  }, [productId]);

  // Helper function to extract numeric value from price string
  const extractPrice = (priceString: string | number): number => {
    if (typeof priceString === 'number') return priceString;
    // Remove ₹ symbol, spaces, and commas, then convert to number
    const cleaned = priceString.replace(/[₹\s,]/g, '');
    return parseInt(cleaned, 10) || 0;
  };

  // Calculate discount in useEffect to prevent infinite re-renders
  useEffect(() => {
    if (product && product.originalPrice) {
      const originalPrice = extractPrice(product.originalPrice);
      const currentPrice = extractPrice(product.price);
      const calculatedDiscount = originalPrice - currentPrice;

      setDiscount(calculatedDiscount);

      // Calculate discount percentage
      if (originalPrice > 0) {
        const calculatedDiscountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
        setDiscountPercentage(calculatedDiscountPercentage);
      }
    }
  }, [product]);

  // Show loading state
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

  // Redirect to 404 if product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
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
    <div className=" bg-black text-white overflow-hidden py-24">
      {/* Smaller + Medium Screen*/}
      <div className="relative block md:hidden z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Side - Product Images */}
          <div className="md:w-1/2 bg-pink-500 rounded-2xl md:rounded-3xl">
            {/* Main Product Image */}
            <div className="relative h-96 sm:h-64 overflow-hidden rounded-2xl md:rounded-3xl">
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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.jpg'; // Fallback image
                  }}
                />
              </div>
              {/* Badges */}
              {product.isNew && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#28a57f] text-white text-xs font-bold rounded-full">
                  NEW
                </div>
              )}
              {product.isBestseller && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#28a57f] text-white text-xs font-bold rounded-full">
                  BESTSELLER
                </div>
              )}
              {product.isPremium && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#28a57f] text-white text-xs font-bold rounded-full">
                  PREMIUM
                </div>
              )}
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-3 justify-center">
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
          )}


          {/* Right Side - Product Details */}
          <div className="md:w-1/2 bg-[#1f1f1f] rounded-2xl md:rounded-3xl border border-[rgba(255,255,255,0.15)] pt-6 pb-3 px-4">
            <div className="mb-6">
              <h1 className="text-lg md:text-xl font-medium text-white mb-1">{product.name}</h1>

              {/* Tonnage */}
              {product.tonnage && (
                <div className="text-gray-300 text-md md:text-lg mb-1">{product.tonnage} • Inverter AC</div>
              )}

              {/* Star Rating */}
              {product.stars && (
                <div className="flex items-center mb-1">
                  <span className="text-gray-300 text-sm lg:text-base mr-1">Rating: </span>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 lg:w-4 lg:h-4 ${i < product.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                        }`}
                    />
                  ))}
                  <span className="text-gray-300 text-xs ml-1">({product.stars}.0)</span>
                </div>
              )}

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
                  onClick={() => console.log('Add to cart clicked')}
                >
                  Checkout
                </button>
                <button
                  className="w-full bg-[#f5b841] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#e5a839] transition-all duration-300 transform hover:scale-105"
                  onClick={() => console.log('Customize clicked')}
                >
                  Customize your Front Panel
                </button>
              </div>
              <div className="w-full h-px mx-auto my-4 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              {/* Features */}
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center ">
                  <div className='p-3 mb-2 bg-[#ffffff14] border border-[#9C9C9C] rounded-full'><Wrench className="w-6 h-6 text-white" /></div>
                  <div className="text-xs text-white font-semibold">Free Installation</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className='p-3 mb-2 bg-[#ffffff14] border border-[#9C9C9C] rounded-full'><RotateCcw className="w-6 h-6 text-white" /></div>
                  <div className="text-xs text-white font-semibold">10-day free return</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className='p-3 mb-2 bg-[#ffffff14] border border-[#9C9C9C] rounded-full'><Shield className="w-6 h-6 text-white" /></div>
                  <div className="text-xs text-white font-semibold">3 year warranty</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Chat Support
      <div className="fixed bottom-6 right-6 bg-green-500 rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors cursor-pointer group">
        <MessageCircle className="w-6 h-6 text-white" />
        <div className="absolute -top-16 right-0 bg-gray-800 text-white p-3 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Real person here 👋<br />
          <span className="text-xs text-gray-400">Typically replies in 4 mins</span>
        </div>
      </div> */}

      {/* //Larger Scren */}
      <div className=" h-full hidden md:block w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Bg Image*/}
        <div className="w-full h-full rounded-4xl flex"
          style={{
            backgroundImage: 'url(https://t4.ftcdn.net/jpg/00/98/59/35/360_F_98593539_L3cNIqMZT511Qoz2DXe31xBAqMqPYdGj.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Colours-div */}
          <div className="w-[10%] min-h-[86vh] flex flex-col justify-center ">
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex flex-col gap-3 justify-center items-center">
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
            )}
          </div>
          {/* image-div */}
          <div className="w-[45%] min-h-[86vh] flex flex-col justify-center ">
            {/* Main Product Image */}
            <div className="h-96 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-image.jpg'; // Fallback image
                }}
              />
            </div>
          </div>
          {/* Right Side - Product Details */}
          <div className="w-[45%] min-h-[86vh] flex justify-center items-center">
            <div className="h-[440px] w-[400px] bg-[#1f1f1f]/60 rounded-2xl md:rounded-3xl border border-[rgba(255,255,255,0.15)] pt-6 pb-4 px-4">
              <div className="mb-6">
                <h1 className="text-lg md:text-xl font-medium text-white mb-1">{product.name}</h1>

                {/* Tonnage */}
                {product.tonnage && (
                  <div className="text-gray-300 text-md md:text-lg mb-1">{product.tonnage} • Inverter AC</div>
                )}

                {/* Star Rating */}
                {product.stars && (
                  <div className="flex items-center mb-1">
                    <span className="text-gray-300 text-sm lg:text-base mr-1">Rating: </span>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 lg:w-4 lg:h-4 ${i < product.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                          }`}
                      />
                    ))}
                    <span className="text-gray-300 text-xs ml-1">({product.stars}.0)</span>
                  </div>
                )}

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
                    className="w-full bg-[#28a57f] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#228a6f] transition-all duration-300 transform active:scale-95 hover:scale-[1.01]"
                    onClick={() => console.log('Add to cart clicked')}
                  >
                    Checkout
                  </button>
                  <button
                    className="w-full bg-[#f5b841] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#e5a839] transition-all duration-300 transform active:scale-95 hover:scale-[1.01]"
                    onClick={() => console.log('Customize clicked')}
                  >
                    Customize your Front Panel
                  </button>
                </div>
                <div className="w-full h-[2px] mx-auto my-4 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                {/* Features */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center text-center ">
                    <div className='p-3 mb-2 bg-[#ffffff14] border border-[#9C9C9C] rounded-full'><Wrench className="w-6 h-6 text-white" /></div>
                    <div className="text-xs text-white font-semibold">Free Installation</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className='p-3 mb-2 bg-[#ffffff14] border border-[#9C9C9C] rounded-full'><RotateCcw className="w-6 h-6 text-white" /></div>
                    <div className="text-xs text-white font-semibold">10-day free return</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className='p-3 mb-2 bg-[#ffffff14] border border-[#9C9C9C] rounded-full'><Shield className="w-6 h-6 text-white" /></div>
                    <div className="text-xs text-white font-semibold">3 year warranty</div>
                  </div>
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