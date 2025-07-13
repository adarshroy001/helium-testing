// components/shop/ProductGrid.tsx
'use client';

import ProductCard from '@/components/Others/ProductCard';
import type { Product } from '@/types/types';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductSelect }) => {
  return (
    <div className="w-full !px-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={() => onProductSelect(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
