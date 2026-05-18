import { Component, OnInit, signal } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService }    from '../../services/cart.service';
import { AuthService }    from '../../services/auth.service';
import { OrderService }   from '../../services/order.service';
import { CheckoutForm }   from '../../models/order.model';

declare const Razorpay: any;

@Component({
  selector: 'app-checkout-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl:    './checkout.scss',
})
export class CheckoutPage implements OnInit {
  form: CheckoutForm = {
    name: '', email: '', phone: '', organization: '',
    shippingAddress: '', city: '', state: '', pincode: '',
    paymentMethod: 'cod', notes: '',
  };

  submitting = signal(false);
  success    = signal(false);
  error      = signal('');
  orderId    = signal('');

  STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
    'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya',
    'Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
    'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir'];

  constructor(
    public cart:    CartService,
    public auth:    AuthService,
    private orders: OrderService,
    private router: Router,
  ) {}

  ngOnInit() {
    const u = this.auth.user();
    if (u) {
      this.form.name         = u.name;
      this.form.email        = u.email;
      this.form.phone        = u.phone;
      this.form.organization = u.organization || '';
      this.form.shippingAddress = u.address    || '';
      this.form.city         = u.city          || '';
      this.form.state        = u.state         || '';
      this.form.pincode      = u.pincode       || '';
    }
    if (this.cart.isEmpty()) this.router.navigate(['/cart']);
  }

  async placeOrder() {
    if (!this.form.name || !this.form.phone || !this.form.shippingAddress) {
      this.error.set('Please fill all required fields.');
      return;
    }
    this.error.set('');

    if (this.form.paymentMethod === 'online') {
      await this.handleRazorpay();
    } else {
      this.submitOrder();
    }
  }

  private submitOrder(razorpayData?: any) {
    this.submitting.set(true);
    this.orders.placeOrder(this.form, this.cart.items()).subscribe({
      next: (res) => {
        this.orderId.set(res.order.orderId);
        this.success.set(true);
        this.cart.clearCart();
        this.submitting.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to place order. Please try again.');
        this.submitting.set(false);
      },
    });
  }

  private handleRazorpay() {
    const total = this.cart.total();
    this.orders.createRazorpayOrder(total).subscribe({
      next: (rpOrder) => {
        const opts = {
          key:          rpOrder.key,
          amount:       rpOrder.amount,
          currency:     'INR',
          name:         'SMAT Medical',
          description:  'Medical Equipment Order',
          order_id:     rpOrder.orderId,
          handler:      (res: any) => this.submitOrder(res),
          prefill: { name: this.form.name, email: this.form.email, contact: this.form.phone },
          theme: { color: '#06B6D4' },
        };
        const rzp = new Razorpay(opts);
        rzp.open();
      },
      error: () => {
        this.error.set('Could not initialise payment. Use Cash on Delivery instead.');
      },
    });
  }
}
