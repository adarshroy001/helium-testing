'use client'
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Bell, ChevronLeft, ChevronRight, FileText, MessageCircle, RotateCcw, Shield, Star } from 'lucide-react';
import type { Product } from '@/types/types';
import { products } from '@/mockdata/products';
interface PageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage: React.FC<PageProps> = ({ params }) => {
  const productId = params.id; //
//   const params = useParams();
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [pincode, setPincode] = useState<string>('');

  // Find the product by ID
  const product = products.find((p) => p.id === productId) as Product;

  // Redirect to 404 if product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <button 
            onClick={() => router.push('/products')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Back Button */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      {/* Product Detail Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl border border-gray-700/30 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Product Images */}
            <div className="lg:w-1/2 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8">
              {/* Main Product Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
                <div
                  className="w-full h-full flex items-center justify-center text-white"
                  style={{ background: product.colors?.[selectedColor] || product.image || 'linear-gradient(135deg, #1f2937, #374151)' }}
                >
                  <div className="relative">
                    {/* AC Unit Illustration */}
                    <div className="w-48 h-32 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-center justify-center">
                      <div className="grid grid-cols-8 gap-1">
                        {[...Array(24)].map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-white/60 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-white/30 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors disabled:opacity-50"
                  disabled={currentImageIndex === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(Math.min(2, currentImageIndex + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors disabled:opacity-50"
                  disabled={currentImageIndex === 2}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex gap-3 mb-4">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-3 transition-all ${
                        selectedColor === index ? 'border-white scale-110' : 'border-gray-600'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}

              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <FileText className="w-4 h-4" />
                <span className="text-sm">View real life images</span>
              </button>
            </div>

            {/* Right Side - Product Details */}
            <div className="lg:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

                {/* Star Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < (product.stars || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-lg">({product.stars || 0}.0)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-white">{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-500 line-through text-2xl">{product.originalPrice}</span>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-lg font-bold">
                        {product.discount || '-20%'}
                      </span>
                    </>
                  )}
                </div>

                {/* EMI */}
                {product.emi && (
                  <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium text-lg">{product.emi}/month</span>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">GST Invoicing</div>
                        <div className="text-xs text-gray-500">Claim input credit of 18% as business expense</div>
                      </div>
                    </div>
                    <div className="text-green-400">
                      0% EMI on <span className="font-semibold">UPI</span> by snapmint
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mb-8">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
                    Add to cart
                  </button>
                  <button className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors">
                    <Bell className="w-6 h-6 text-white" />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-orange-400 mb-8">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span>Sold out</span>
                  <span className="text-gray-400 ml-auto">Notify me</span>
                </div>

                {/* Delivery */}
                <div className="bg-gray-800/30 rounded-xl p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-white font-medium text-lg">Delivery Estimate</span>
                  </div>
                  <div className="flex gap-3 mb-4">
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      value={pincode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPincode(e.target.value)}
                      className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                    />
                    <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors">
                      Check
                    </button>
                  </div>
                  <div className="text-gray-400">Delivery within 3-7 days across India</div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4 bg-gray-800/30 rounded-xl">
                    <FileText className="w-10 h-10 text-gray-400 mb-3" />
                    <div className="text-sm text-gray-400">BIFMA certified</div>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gray-800/30 rounded-xl">
                    <RotateCcw className="w-10 h-10 text-gray-400 mb-3" />
                    <div className="text-sm text-gray-400">10-day free return</div>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gray-800/30 rounded-xl">
                    <Shield className="w-10 h-10 text-gray-400 mb-3" />
                    <div className="text-sm text-gray-400">3 year warranty</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Support */}
      <div className="fixed bottom-6 right-6 bg-green-500 rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors cursor-pointer">
        <MessageCircle className="w-6 h-6 text-white" />
        <div className="absolute -top-16 right-0 bg-gray-800 text-white p-3 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Real person here 👋<br />
          <span className="text-xs text-gray-400">Typically replies in 4 mins</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;