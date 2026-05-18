import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem }   from './cart.service';
import { CheckoutForm, Order } from '../models/order.model';
import { environment } from '../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  placeOrder(form: CheckoutForm, items: CartItem[]) {
    return this.http.post<{ order: Order; message: string }>(`${API}/orders`, {
      items: items.map((i) => ({ productId: i.productId, name: i.name, quantity: i.quantity, price: i.price })),
      shippingAddress: form.shippingAddress,
      city:            form.city,
      state:           form.state,
      pincode:         form.pincode,
      paymentMethod:   form.paymentMethod,
      notes:           form.notes,
      guestInfo: {
        name:         form.name,
        email:        form.email,
        phone:        form.phone,
        organization: form.organization,
      },
    });
  }

  getMyOrders() {
    return this.http.get<Order[]>(`${API}/orders`);
  }

  getOrder(id: string) {
    return this.http.get<Order>(`${API}/orders/${id}`);
  }

  createRazorpayOrder(amount: number) {
    return this.http.post<{ orderId: string; amount: number; key: string }>(`${API}/payment/create-order`, { amount });
  }

  verifyPayment(data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; orderId: string }) {
    return this.http.post(`${API}/payment/verify`, data);
  }
}
