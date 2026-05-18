import { Component, OnInit, signal } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterLink }     from '@angular/router';
import { AdminService }   from '../../services/admin.service';
import { ProductService } from '../../services/product.service';
import { AuthService }    from '../../services/auth.service';

type AdminTab = 'dashboard' | 'orders' | 'products' | 'customers' | 'inventory';

@Component({
  selector: 'app-admin-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl:    './admin.scss',
})
export class AdminPage implements OnInit {
  tab      = signal<AdminTab>('dashboard');
  loading  = signal(true);
  stats    = signal<any>({});
  orders   = signal<any[]>([]);
  products = signal<any[]>([]);
  customers = signal<any[]>([]);
  inventory = signal<any[]>([]);

  orderSearch   = '';
  productSearch = '';
  customerSearch = '';

  // Product modal
  showModal   = signal(false);
  editProduct = signal<any | null>(null);
  productForm = signal<any>({});
  saving      = signal(false);
  saveError   = signal('');

  CATEGORIES = ['medical','dental','lab','surgical','icu','supplies'];
  STATUS_LIST = ['placed','confirmed','processing','shipped','delivered','cancelled'];

  constructor(
    private adminSvc:   AdminService,
    private productSvc: ProductService,
    public  auth:       AuthService,
  ) {}

  ngOnInit() { this.loadDashboard(); }

  loadDashboard() {
    this.loading.set(true);
    this.adminSvc.getStats().subscribe({
      next: (s) => { this.stats.set(s); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  switchTab(t: AdminTab) {
    this.tab.set(t);
    if (t === 'orders')    this.loadOrders();
    if (t === 'products')  this.loadProducts();
    if (t === 'customers') this.loadCustomers();
    if (t === 'inventory') this.loadInventory();
  }

  loadOrders()    { this.adminSvc.getOrders({ search: this.orderSearch }).subscribe(r => this.orders.set(r.orders)); }
  loadProducts()  { this.adminSvc.getProducts({ search: this.productSearch }).subscribe(r => this.products.set(r.products)); }
  loadCustomers() { this.adminSvc.getCustomers({ search: this.customerSearch }).subscribe(r => this.customers.set(r.customers)); }
  loadInventory() { this.adminSvc.getInventory().subscribe(r => this.inventory.set(r)); }

  updateStatus(orderId: string, status: string) {
    this.adminSvc.updateOrderStatus(orderId, status).subscribe(() => this.loadOrders());
  }

  openNewProduct() {
    this.editProduct.set(null);
    this.productForm.set({ name:'', category:'medical', subcategory:'', price:0, stock:0, inStock:true, description:'', shortDesc:'', brand:'SMAT Medical', icon:'fas fa-box', iconColor:'blue', featured:false });
    this.showModal.set(true);
  }

  openEditProduct(p: any) {
    this.editProduct.set(p);
    this.productForm.set({ ...p });
    this.showModal.set(true);
  }

  saveProduct() {
    this.saving.set(true);
    this.saveError.set('');
    const ep = this.editProduct();
    const obs = ep
      ? this.productSvc.updateProduct(ep._id, this.productForm())
      : this.productSvc.createProduct(this.productForm());

    obs.subscribe({
      next: () => { this.showModal.set(false); this.saving.set(false); this.loadProducts(); },
      error: (e) => { this.saveError.set(e.error?.message || 'Save failed'); this.saving.set(false); },
    });
  }

  deleteProduct(id: string) {
    if (!confirm('Deactivate this product?')) return;
    this.productSvc.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  closeModal() { this.showModal.set(false); }

  formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  statusColor(s: string): string {
    const map: Record<string,string> = { placed:'blue', confirmed:'cyan', processing:'yellow', shipped:'purple', delivered:'green', cancelled:'red' };
    return map[s] || 'blue';
  }
}
