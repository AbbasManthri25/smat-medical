import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, ProductsResponse, ProductFilters } from '../models/product.model';
import { environment } from '../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(filters: ProductFilters = {}) {
    let params = new HttpParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params = params.set(k, String(v));
    });
    return this.http.get<ProductsResponse>(`${API}/products`, { params });
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${API}/products/${id}`);
  }

  getFeatured() {
    return this.http.get<Product[]>(`${API}/products/featured`);
  }

  // Admin
  createProduct(data: Partial<Product>) {
    return this.http.post<Product>(`${API}/products`, data);
  }

  updateProduct(id: string, data: Partial<Product>) {
    return this.http.put<Product>(`${API}/products/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${API}/products/${id}`);
  }
}
