'use client'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, ChevronLeft, ChevronRight, FileText, MessageCircle, Minus, Plus, RotateCcw, Shield, Star, Wrench } from 'lucide-react';
import { BackendProduct } from '@/types/types';
import { ProductVariant, findVariantByIndices } from '@/lib/productDetailTransformer';
import { Button } from '@/components/ui/button';

interface ProductDetailClientProps {
  productVariants: ProductVariant[];
  backendProduct: BackendProduct;
  productId: string;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  productVariants,
  backendProduct,
  productId
}) => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedTonnageIndex, setSelectedTonnageIndex] = useState<number>(0);
  const [selectedStarIndex, setSelectedStarIndex] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [pincode, setPincode] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Get current product variant based on selections
  const currentVariant = useMemo(() => {
    return findVariantByIndices(productVariants, selectedColorIndex, selectedTonnageIndex, selectedStarIndex) || productVariants[0];
  }, [productVariants, selectedColorIndex, selectedTonnageIndex, selectedStarIndex]);

  // Get available options for current selection
  const availableOptions = useMemo(() => {
    const currentColor = backendProduct.colors[selectedColorIndex];

    return {
      colors: backendProduct.colors.map((color, index) => ({
        ...color,
        index,
        isAvailable: true
      })),
      tonnages: currentColor?.Ton.map((tonnage, index) => ({
        ...tonnage,
        index,
        isAvailable: true
      })) || []
    };
  }, [backendProduct, selectedColorIndex]);

  // Handle color selection
  const handleColorChange = useCallback((colorIndex: number) => {
    setSelectedColorIndex(colorIndex);
    setSelectedTonnageIndex(0);
    setSelectedStarIndex(0);
    setCurrentImageIndex(0);
  }, []);

  // Handle tonnage selection
  const handleTonnageChange = useCallback((tonnageIndex: number) => {
    setSelectedTonnageIndex(tonnageIndex);
    setSelectedStarIndex(0);
  }, []);

  // Handle star rating selection
  const handleStarChange = useCallback((starIndex: number) => {
    setSelectedStarIndex(starIndex);
  }, []);

  // Helper function to extract numeric value from price string
  const extractPrice = useCallback((priceString: string | number): number => {
    if (typeof priceString === 'number') return priceString;
    const cleaned = priceString.replace(/[₹\s,]/g, '');
    return parseInt(cleaned, 10) || 0;
  }, []);

  // Calculate discount
  const { discount, discountPercentage } = useMemo(() => {
    if (!currentVariant?.originalPrice) {
      return { discount: 0, discountPercentage: 0 };
    }

    const originalPrice = extractPrice(currentVariant.originalPrice);
    const currentPrice = extractPrice(currentVariant.price);
    const calculatedDiscount = originalPrice - currentPrice;

    const calculatedDiscountPercentage = originalPrice > 0
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

    return {
      discount: calculatedDiscount,
      discountPercentage: calculatedDiscountPercentage
    };
  }, [currentVariant, extractPrice]);

  // Handle checkout
  const handleCheckout = useCallback(() => {
    if (currentVariant) {
      const params = new URLSearchParams({
        productId: productId,
        colorIndex: selectedColorIndex.toString(),
        tonnageIndex: selectedTonnageIndex.toString(),
        starIndex: selectedStarIndex.toString(),
        quantity: quantity.toString()
      });
      router.push(`/checkout?${params.toString()}`);
    }
  }, [router, productId, selectedColorIndex, selectedTonnageIndex, selectedStarIndex, quantity, currentVariant]);

  // Handle customize
  const handleCustomize = useCallback(() => {
    if (currentVariant) {
      const params = new URLSearchParams({
        productId: productId,
        colorIndex: selectedColorIndex.toString(),
        tonnageIndex: selectedTonnageIndex.toString(),
        starIndex: selectedStarIndex.toString(),
        quantity: quantity.toString()
      });
      router.push(`/customize?${params.toString()}`);
    }
  }, [router, productId, selectedColorIndex, selectedTonnageIndex, selectedStarIndex, quantity, currentVariant]);

  // Handle quantity changes
  const handleQuantityChange = useCallback((change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  }, []);

  // Error handling for image loading
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-image.jpg';
  }, []);

  // Render star rating
  const StarRating = useMemo(() => {
    if (!currentVariant?.stars) return null;

    return (
      <div className="flex items-center mb-1 md:mb-4">
        <span className="text-gray-300 text-sm md:text-lg mr-1 md:mr-2">Review: </span>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 lg:w-4 lg:h-4 ${i < currentVariant.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
              }`}
          />
        ))}
      </div>
    );
  }, [currentVariant?.stars]);

  // Color selection component
  const ColorSelection = useMemo(() => {
    return (
      <div className="flex gap-3 justify-center xl:justify-center xl:items-center">
        {availableOptions.colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorChange(index)}
            className={`w-7 h-7 md:w-10 md:h-10 rounded-full border transition-all ${selectedColorIndex === index ? 'border-white scale-110' : 'border-gray-600'
              }`}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select color ${color.colorName}`}
            title={color.colorName}
          />
        ))}
      </div>
    );
  }, [availableOptions.colors, selectedColorIndex, handleColorChange]);

  // Features section
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

  // Product badges
  const ProductBadges = useMemo(() => {
    if (!currentVariant) return null;

    const badges = [];

    if (currentVariant.isNew) {
      badges.push(
        <div key="new" className="absolute top-4 left-4 px-3 py-1 bg-[#28a57f] text-white text-xs font-bold rounded-full">
          NEW
        </div>
      );
    }

    if (currentVariant.isBestseller) {
      badges.push(
        <div key="bestseller" className="absolute top-4 left-4 px-3 py-1 bg-[#28a57f] text-white text-xs font-bold rounded-full">
          BESTSELLER
        </div>
      );
    }

    if (currentVariant.isPremium) {
      badges.push(
        <div key="premium" className="absolute top-4 left-4 px-3 py-1 bg-[#28a57f] text-white text-xs font-bold rounded-full">
          PREMIUM
        </div>
      );
    }

    return badges;
  }, [currentVariant]);

  if (!currentVariant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Available</h1>
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
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Smaller + lg Screen */}
      <div className="relative block xl:hidden max-w-4xl z-10 mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-6 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-6">
        <div className="flex flex-col xl:flex-row gap-4">
          {/* Left Side - Product Images */}
          <div className="rounded-2xl md:rounded-3xl">
            {/* Main Product Image */}
            <div className="relative h-96 sm:h-[420px] md:h-[450px] lg:h-[480px] xl:h-64 overflow-hidden rounded-2xl md:rounded-3xl">
              <div
                className="w-full h-full flex items-center justify-center text-white font-bold text-2xl"
                style={{
                  backgroundImage: 'url(https://res.cloudinary.com/dqhk6dblu/image/upload/v1752040346/bgCard_uwhvcx.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <img
                  src={currentVariant.image}
                  alt={currentVariant.name}
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

          {/* Scrollable Options for Small Screens */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-max px-2">
              {availableOptions.tonnages.map((tonnage) =>
                tonnage.stars.map((star, starIndex) => { // Add starIndex here
                  const isSelected = selectedTonnageIndex === tonnage.index && selectedStarIndex === starIndex;
                  const isDisabled = star.stock <= 0;
                  return (
                    <button
                      key={`${tonnage.index}-${starIndex}`} // Use starIndex
                      onClick={() => {
                        if (!isDisabled) {
                          handleTonnageChange(tonnage.index);
                          handleStarChange(starIndex); // Use starIndex
                        }
                      }}
                      disabled={isDisabled}
                      className={`flex flex-col items-center justify-center min-w-[110px] px-3 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap ${isSelected ? 'border-[#28a57f] bg-[#28a57f]/20 text-white' : 'border-gray-600 text-gray-300'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#28a57f] hover:bg-[#28a57f]/10 cursor-pointer'}`}
                    >
                      <span className="font-semibold text-sm">
                        {tonnage.ton} Ton | {star.star} Star
                      </span>
                      <span className="text-xs">
                        ₹{star.sellingPrice.toLocaleString()}
                      </span>
                      {isDisabled && <span className="text-xs text-red-500">Out of Stock</span>}
                    </button>
                  );
                })
              )}
            </div>
          </div>


          {/* Right Side - Product Details */}
          <div className="bg-[#1f1f1f] rounded-2xl md:rounded-3xl border border-[rgba(255,255,255,0.15)] pt-6 pb-3 px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="mb-6">
              <h1 className="text-lg md:text-xl font-medium text-white mb-1">{currentVariant.name}</h1>

              {/* Tonnage */}
              {currentVariant.tonnage && (
                <div className="text-gray-300 text-md md:text-lg mb-1">{currentVariant.tonnage} • Inverter AC</div>
              )}

              {/* Star Rating */}
              {StarRating}

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg md:text-xl font-semibold text-white">{currentVariant.price}</span>
                {currentVariant.originalPrice && (
                  <>
                    <span className="text-gray-500 line-through text-sm md:text-base">{currentVariant.originalPrice}</span>
                    <span className="text-[#28a57f] bg-[#28a57f]/10 rounded-full px-3 py-1 text-sm">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              {currentVariant.stock <= 5 && currentVariant.stock > 0 && (
                <div className="text-yellow-400 text-sm mb-2">
                  Only {currentVariant.stock} left in stock!
                </div>
              )}
              {currentVariant.stock === 0 && (
                <div className="text-red-500 text-sm mb-2">
                  Out of Stock
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-10 md:w-10 bg-[#2a2a2a] rounded-full active:scale-90"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4 md:h-6 md:w-6" />
                </Button>
                <span className="text-base sm:text-lg min-w-[2rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-10 md:w-10 bg-[#2a2a2a] rounded-full active:scale-90"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= currentVariant.stock}
                >
                  <Plus className="h-4 w-4 md:h-6 md:w-6" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 my-8">
                <button
                  className="w-full bg-[#28a57f] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#228a6f] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCheckout}
                  disabled={currentVariant.stock === 0}
                >
                  {currentVariant.stock === 0 ? 'Out of Stock' : 'Checkout'}
                </button>
                <button
                  className="w-full bg-[#f5b841] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#e5a839] transition-all duration-300 transform hover:scale-105"
                  onClick={handleCustomize}
                  disabled={currentVariant.stock === 0}
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

      {/* Extra Large Screen */}
      <div className="h-full hidden xl:block w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">
        <div className="w-full h-full rounded-3xl flex"
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/dqhk6dblu/image/upload/v1752040346/bgCard_uwhvcx.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* image-div */}
          <div className="w-[55%] min-h-[66%] flex flex-col justify-center">
            <div className="h-96 overflow-hidden">
              <img
                src={currentVariant.image}
                alt={currentVariant.name}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
                onError={handleImageError}
              />
            </div>
            {/* Colors-div */}
            <div className="flex justify-center mt-6">
              {ColorSelection}
            </div>

            {/* New scrollable options div below colors-div */}
            <div className="relative mt-4 w-4/5 mx-auto">
              <button
                onClick={() => scrollContainerRef.current?.scrollBy({ left: -150, behavior: 'smooth' })}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-[#1f1f1f]/80 hover:bg-[#28a57f] text-white rounded-full p-2 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Large screen scrollable options */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide gap-4 px-12 py-2 scroll-smooth"
                style={{ scrollBehavior: 'smooth' }}
              >
                {availableOptions.tonnages.map((tonnage) =>
                  tonnage.stars.map((star, starIndex) => { // Add starIndex here
                    const isSelected = selectedTonnageIndex === tonnage.index && selectedStarIndex === starIndex;
                    const isDisabled = star.stock <= 0;
                    return (
                      <button
                        key={`${tonnage.index}-${starIndex}`} // Use starIndex
                        onClick={() => {
                          if (!isDisabled) {
                            handleTonnageChange(tonnage.index);
                            handleStarChange(starIndex); // Use starIndex
                          }
                        }}
                        disabled={isDisabled}
                        className={`flex flex-col items-center justify-center min-w-[120px] px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap ${isSelected ? 'border-[#28a57f] bg-[#28a57f]/20 text-white' : 'border-gray-600 text-gray-300'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#28a57f] hover:bg-[#28a57f]/10 cursor-pointer'}`}
                      >
                        <span className="font-semibold text-base">
                          {tonnage.ton} Ton | {star.star} Star
                        </span>
                        <span className="text-sm">
                          ₹{star.sellingPrice.toLocaleString()}
                        </span>
                        {isDisabled && <span className="text-xs text-red-500">Out of Stock</span>}
                      </button>
                    );
                  })
                )}
              </div>


              <button
                onClick={() => scrollContainerRef.current?.scrollBy({ left: 150, behavior: 'smooth' })}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-[#1f1f1f]/80 hover:bg-[#28a57f] text-white rounded-full p-2 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="w-[45%] min-h-[86%] flex justify-center items-center overflow-hidden">
            <div className="h-fit max-h-[80%] w-[80%] overflow-hidden bg-[#1f1f1f]/60 rounded-2xl md:rounded-3xl border border-[rgba(255,255,255,0.15)] pt-6 px-4">
              <div className="">
                <h1 className="text-lg md:text-3xl font-medium text-white mb-3">{currentVariant.name}</h1>

                {/* Tonnage */}
                {currentVariant.tonnage && (
                  <div className="text-gray-300 text-md md:text-xl mb-3">{currentVariant.tonnage} | {currentVariant.stars} Star | Inverter</div>
                )}

                {/* Star Rating */}
                {StarRating}

                {/* Price */}
                <div className="flex items-center gap-2 mb-4 md:mb-8">
                  <span className="text-xl md:text-2xl font-semibold text-white">{currentVariant.price}</span>
                  {currentVariant.originalPrice && (
                    <>
                      <span className="text-gray-500 line-through text-base md:text-lg">{currentVariant.originalPrice}</span>
                      <span className="text-[#28a57f] bg-[#28a57f]/10 rounded-full px-3 py-1 text-sm md:text-base">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                {currentVariant.stock <= 5 && currentVariant.stock > 0 && (
                  <div className="text-yellow-400 text-sm mb-2">
                    Only {currentVariant.stock} left in stock!
                  </div>
                )}
                {currentVariant.stock === 0 && (
                  <div className="text-red-500 text-sm mb-2">
                    Out of Stock
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 md:h-10 md:w-10 bg-[#2a2a2a] rounded-full active:scale-90"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4 md:h-6 md:w-6" />
                  </Button>
                  <span className="text-base sm:text-lg min-w-[2rem] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 md:h-10 md:w-10 bg-[#2a2a2a] rounded-full active:scale-90"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= currentVariant.stock}
                  >
                    <Plus className="h-4 w-4 md:h-6 md:w-6" />
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 my-8">
                  <button
                    className="w-full bg-[#28a57f] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#228a6f] transition-all duration-300 transform active:scale-95 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCheckout}
                    disabled={currentVariant.stock === 0}
                  >
                    {currentVariant.stock === 0 ? 'Out of Stock' : 'Checkout'}
                  </button>
                  <button
                    className="w-full bg-[#f5b841] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#e5a839] transition-all duration-300 transform active:scale-95 hover:scale-[1.01]"
                    onClick={handleCustomize}
                    disabled={currentVariant.stock === 0}
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

export default ProductDetailClient;
