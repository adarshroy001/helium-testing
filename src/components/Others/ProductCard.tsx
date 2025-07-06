'use client'
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { Product, ProductCardProps } from '@/types/types';

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedColor, setSelectedColor] = useState<number>(0);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    
    const handleClick = () => {
        if (onSelect) {
            onSelect(product);
        }
    };

    return (
        <div
            className="group relative mx-1.5 sm:mx-2 md:mx-auto lg:mx-3 xl:mx-auto my-2 sm:my-3 lg:my-6 bg-[#1f1f1f] rounded-xl md:rounded-3xl max-w-[340px] overflow-hidden transition-all duration-500 hover:transform cursor-pointer"
            onClick={() => {
                setSelectedProduct(product);
                setSelectedColor(0);
                setCurrentImageIndex(0);
                handleClick();
            }}
        >
            {/* Product Image */}
            <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-xl md:rounded-t-3xl">
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

            {/* Product Info */}
            <div className="px-2 py-2 sm:px-3 md:px-4 lg:px-6 lg:py-2.5 font-Metropolis">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white mb-0 lg:mb-1 truncate w-full">
                    {product.name}
                </h3>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-0.5 lg:mb-1 truncate w-full">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3 h-3 lg:w-4 lg:h-4 ${
                                i < product.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                            }`}
                        />
                    ))}
                </div>

                {/* Tonnage and Star Rating */}
                <div className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base mb-0.5 lg:mb-1 truncate w-full">
                    {product.tonnage} • {product.stars} Star • {product.colorName}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 truncate w-full">
                    <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                        {product.price}
                    </span>
                    {product.originalPrice && (
                        <span className="text-gray-500 line-through text-xs lg:text-sm">
                            {product.originalPrice}
                        </span>
                    )}
                </div>

                {/* Stock Status */}
                {product.stock <= 5 && product.stock > 0 && (
                    <div className="text-red-400 text-xs mt-1">
                        Only {product.stock} left!
                    </div>
                )}
                {product.stock === 0 && (
                    <div className="text-red-500 text-xs mt-1">
                        Out of Stock
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;