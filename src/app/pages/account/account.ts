import { Component, OnInit, signal } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterLink }     from '@angular/router';
import { AuthService }    from '../../services/auth.service';
import { OrderService }   from '../../services/order.service';
import { Order }          from '../../models/order.model';

type Tab = 'orders' | 'profile';

const STATUS_COLORS: Record<string, string> = {
  placed: 'blue', confirmed: 'cyan', processing: 'yellow',
  shipped: 'purple', delivered: 'green', cancelled: 'red',
};

@Component({
  selector: 'app-account-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './account.html',
  styleUrl:    './account.scss',
})
export class AccountPage implements OnInit {
  tab     = signal<Tab>('orders');
  orders  = signal<Order[]>([]);
  loading = signal(true);
  saved   = signal(false);
  error   = signal('');

  profile = { name: '', email: '', phone: '', organization: '', address: '', city: '', state: '', pincode: '' };

  constructor(public auth: AuthService, private orderSvc: OrderService) {}

  ngOnInit() {
    const u = this.auth.user()!;
    this.profile = {
      name: u.name, email: u.email, phone: u.phone,
      organization: u.organization || '', address: u.address || '',
      city: u.city || '', state: u.state || '', pincode: u.pincode || '',
    };
    this.loadOrders();
  }

  loadOrders() {
    this.loading.set(true);
    this.orderSvc.getMyOrders().subscribe({
      next:  (o) => { this.orders.set(o); this.loading.set(false); },
      error: () => { this.loading.set(false); },
    });
  }

  saveProfile() {
    this.auth.updateProfile(this.profile).subscribe({
      next: () => { this.saved.set(true); setTimeout(() => this.saved.set(false), 2500); },
      error: (err) => this.error.set(err.error?.message || 'Update failed'),
    });
  }

  statusColor(s: string) { return STATUS_COLORS[s] || 'blue'; }

  formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
