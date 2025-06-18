'use client'
import React, { useState } from 'react';
import { Star, } from 'lucide-react';
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
            className="group relative bg-[#1f1f1f] rounded-2xl md:rounded-3xl max-w-[300px] overflow-hidden transition-all duration-500 hover:transform hover:scale-[1.02] cursor-pointer"
            onClick={() => {
                setSelectedProduct(product);
                setSelectedColor(0);
                setCurrentImageIndex(0);
            }}
        >
            {/* Product Image */}
            <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-2xl md:rounded-t-3xl">
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
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110 scale-110 sm:scale-100 "
                        loading="lazy"
                    />
                </div>

                {/* Badges */}
                {product.isNew && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#033129] text-white text-xs font-bold rounded-full">
                        NEW
                    </div>
                )}
                {product.isBestseller && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#033129] text-white text-xs font-bold rounded-full">
                        BESTSELLER
                    </div>
                )}
                {product.isPremium && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#033129] text-white text-xs font-bold rounded-full">
                        PREMIUM
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="px-2 py-2 lg:px-6 lg:py-3 h-24 font-Metropolis" onClick={handleClick}>
                <h3 className="text-sm lg:text-lg font-medium text-white mb-0 lg:mb-1">{product.name}</h3>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-0.5 lg:mb-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3 h-3 lg:w-4 lg:h-4 ${i < product.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                                }`}
                        />
                    ))}
                    <span className="text-gray-400 text-xs ml-1">({product.stars}.0)</span>
                </div>

                {/* Tonnage */}
                <div className="text-gray-300 text-xs lg:text-sm mb-1">{product.tonnage} • Inverter AC</div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm lg:text-xl font-semibold text-white">{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-gray-500 line-through text-xs lg:text-sm">{product.originalPrice}</span>
                    )}
                </div>

                {/* Color Options */}
                {/* <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                        <button
                            key={index}
                            className="w-6 h-6 rounded-full border-2 border-gray-600 hover:border-white transition-colors"
                            style={{ backgroundColor: color }}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        />
                    ))}
                </div> */}
            </div>
        </div>
    );


};

export default ProductCard;