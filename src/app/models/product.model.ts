export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc?: string;
  category: 'medical' | 'dental' | 'lab' | 'surgical' | 'icu' | 'supplies';
  subcategory: string;
  brand: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: number;
  inStock: boolean;
  images: string[];
  icon: string;
  iconColor?: string;
  tags?: string[];
  specifications?: { key: string; value: string }[];
  featured: boolean;
  isActive: boolean;
  orderCount: number;
  createdAt: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: { total: number; page: number; limit: number; pages: number };
}

export interface ProductFilters {
  search?:      string;
  category?:    string;
  subcategory?: string;
  minPrice?:    number;
  maxPrice?:    number;
  inStock?:     boolean;
  featured?:    boolean;
  sort?:        string;
  order?:       'asc' | 'desc';
  page?:        number;
  limit?:       number;
}
