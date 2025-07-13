import { BackendProduct, Product } from '@/types/types';

export function transformBackendProducts(backendProducts: BackendProduct[]): Product[] {
  const transformedProducts: Product[] = [];

  backendProducts.forEach(product => {
    product.colors.forEach(color => {
      color.Ton.forEach(tonnage => {
        tonnage.stars.forEach(starRating => {
          // Create a flattened product for each combination
          const flatProduct: Product = {
            id: `${product._id}-${color.colorName}-${tonnage.ton}-${starRating.star}`,
            backendId: product._id,
            name: product.name,
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
            // isNew: starRating.tag === 'Hot',
            // isBestseller: starRating.tag === 'Most Selling' || starRating.tag === 'Popular',
            // isPremium: starRating.tag === 'Premium'
          };

          transformedProducts.push(flatProduct);
        });
      });
    });
  });

  return transformedProducts;
}

export function getAvailableTonnages(products: Product[]): string[] {
  const tonnages = new Set(products.map(p => p.tonnage));
  return Array.from(tonnages).sort();
}

export function getAvailableStars(products: Product[]): number[] {
  const stars = new Set(products.map(p => p.stars));
  return Array.from(stars).sort((a, b) => b - a);
}
