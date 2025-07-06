import { BackendProduct, Product } from '@/types/types';

export interface ProductVariant extends Product {
  colorIndex: number;
  tonnageIndex: number;
  starIndex: number;
  availableColors: Array<{
    colorName: string;
    hex: string;
    images: string[];
    index: number;
  }>;
  availableTonnages: Array<{
    ton: number;
    index: number;
  }>;
  availableStars: Array<{
    star: number;
    index: number;
    MRP: number;
    sellingPrice: number;
    stock: number;
    tag: string;
  }>;
}

export function transformSingleProduct(backendProduct: BackendProduct): ProductVariant[] {
  const variants: ProductVariant[] = [];

  backendProduct.colors.forEach((color, colorIndex) => {
    color.Ton.forEach((tonnage, tonnageIndex) => {
      tonnage.stars.forEach((starRating, starIndex) => {
        // Create variant for this specific combination
        const variant: ProductVariant = {
          id: `${backendProduct._id}-${colorIndex}-${tonnageIndex}-${starIndex}`,
          backendId: backendProduct._id,
          name: backendProduct.name,
          price: `₹${starRating.sellingPrice.toLocaleString()}`,
          originalPrice: starRating.MRP !== starRating.sellingPrice ? `₹${starRating.MRP.toLocaleString()}` : undefined,
          tonnage: `${tonnage.ton} Ton`,
          stars: starRating.star,
          image: color.images[0] || '/default-product-image.png',
          colorName: color.colorName,
          colors: [color.hex],
          sellingPrice: starRating.sellingPrice,
          MRP: starRating.MRP,
          stock: starRating.stock,
          tag: starRating.tag,
          // Determine badges based on tag
          isNew: starRating.tag === 'Hot',
          isBestseller: starRating.tag === 'Most Selling' || starRating.tag === 'Popular',
          isPremium: starRating.tag === 'Premium',
          
          // Store indices for variant switching
          colorIndex,
          tonnageIndex,
          starIndex,
          
          // Available options for this product
          availableColors: backendProduct.colors.map((c, i) => ({
            colorName: c.colorName,
            hex: c.hex,
            images: c.images,
            index: i
          })),
          
          availableTonnages: tonnage.ton ? [{ ton: tonnage.ton, index: tonnageIndex }] : [],
          
          availableStars: tonnage.stars.map((s, i) => ({
            star: s.star,
            index: i,
            MRP: s.MRP,
            sellingPrice: s.sellingPrice,
            stock: s.stock,
            tag: s.tag
          }))
        };

        variants.push(variant);
      });
    });
  });

  return variants;
}

export function findVariantByIndices(
  variants: ProductVariant[], 
  colorIndex: number, 
  tonnageIndex: number, 
  starIndex: number
): ProductVariant | undefined {
  return variants.find(v => 
    v.colorIndex === colorIndex && 
    v.tonnageIndex === tonnageIndex && 
    v.starIndex === starIndex
  );
}
