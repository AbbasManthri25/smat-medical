import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API = `${environment.apiUrl}/admin`;

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<any>(`${API}/stats`);
  }

  getOrders(params: Record<string, any> = {}) {
    let p = new HttpParams();
    Object.entries(params).forEach(([k, v]) => { if (v) p = p.set(k, String(v)); });
    return this.http.get<any>(`${API}/orders`, { params: p });
  }

  getOrder(id: string) {
    return this.http.get<any>(`${API}/orders/${id}`);
  }

  updateOrderStatus(id: string, orderStatus: string, note?: string) {
    return this.http.put<any>(`${API}/orders/${id}`, { orderStatus, note });
  }

  getCustomers(params: Record<string, any> = {}) {
    let p = new HttpParams();
    Object.entries(params).forEach(([k, v]) => { if (v) p = p.set(k, String(v)); });
    return this.http.get<any>(`${API}/customers`, { params: p });
  }

  getProducts(params: Record<string, any> = {}) {
    let p = new HttpParams();
    Object.entries(params).forEach(([k, v]) => { if (v) p = p.set(k, String(v)); });
    return this.http.get<any>(`${API}/products`, { params: p });
  }

  getInventory() {
    return this.http.get<any[]>(`${API}/inventory`);
  }
}
