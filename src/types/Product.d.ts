export type StarTag = 'Popular' | 'Most Selling' | 'Hot' | 'Crazy Deal' | 'Big Saving' | 'Premium';

export interface Star {
  star: number;
  MRP: number;
  sellingPrice: number;
  stock: number;
  tag: StarTag;
}

export interface Tonnage {
  ton: number;
  stars: Star[];
}

export interface Colors {
  colorName: string;
  hex: string;
  images: string[];
  Ton: Tonnage[];
}

export interface Product {
  name: string;
  description: string;
  inverter: boolean;
  colors: Colors[];
}
