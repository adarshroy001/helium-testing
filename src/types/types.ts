export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  tonnage: string;
  stars: number;
  image: string;
  colors: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isPremium?: boolean;
  emi: string;
  discount?: string;
  features: string[];
  specifications: {
    [key: string]: string;
  };
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
