// Backend types (matching your API)
export interface BackendStar {
  star: number;
  MRP: number;
  sellingPrice: number;
  stock: number;
  tag: 'Popular' | 'Most Selling' | 'Hot' | 'Crazy Deal' | 'Big Saving' | 'Premium';
}

export interface BackendTonnage {
  ton: number;
  stars: BackendStar[];
}

export interface BackendColors {
  colorName: string;
  hex: string;
  images: string[];
  Ton: BackendTonnage[];
}

export interface BackendProduct {
  _id: string;
  name: string;
  description: string;
  inverter: boolean;
  colors: BackendColors[];
  createdAt: string;
  updatedAt: string;
}

// Frontend types (flattened for UI)
export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description?: string;
  tonnage: string;
  stars: number;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isPremium?: boolean;
  colors: string[];
  colorName: string;
  sellingPrice: number;
  MRP: number;
  stock: number;
  tag: string;
  backendId: string;
}

export interface FilterDropdownProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
}

export interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}
