import { Component, OnInit, signal } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterLink }     from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService }    from '../../services/cart.service';
import { Product, ProductFilters } from '../../models/product.model';
import { STATIC_PRODUCTS, filterProducts } from '../../data/products-data';

const CATEGORIES = [
  { id: '',         label: 'All Products',       icon: 'fas fa-th-large' },
  { id: 'medical',  label: 'Medical Equipment',  icon: 'fas fa-hospital' },
  { id: 'dental',   label: 'Dental Products',    icon: 'fas fa-tooth' },
  { id: 'lab',      label: 'Lab & Diagnostics',  icon: 'fas fa-flask' },
  { id: 'surgical', label: 'Surgical',           icon: 'fas fa-scalpel' },
  { id: 'icu',      label: 'ICU Equipment',      icon: 'fas fa-bed-pulse' },
  { id: 'supplies', label: 'Medical Supplies',   icon: 'fas fa-box-open' },
];

@Component({
  selector: 'app-catalog-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class CatalogPage implements OnInit {
  categories = CATEGORIES;
  products   = signal<Product[]>([]);
  loading    = signal(true);
  error      = signal('');
  totalPages = signal(1);
  totalCount = signal(0);
  usingStatic = signal(false);

  filters: ProductFilters = {
    category: '', search: '', sort: 'createdAt', order: 'desc',
    page: 1, limit: 24, minPrice: undefined, maxPrice: undefined,
  };

  addedId = signal('');

  constructor(private productSvc: ProductService, private cart: CartService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.error.set('');
    this.productSvc.getProducts(this.filters).subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.totalPages.set(res.pagination.pages);
        this.totalCount.set(res.pagination.total);
        this.usingStatic.set(false);
        this.loading.set(false);
      },
      error: () => {
        this.loadStatic();
      },
    });
  }

  private loadStatic() {
    const filtered = filterProducts(STATIC_PRODUCTS, {
      category:  this.filters.category,
      search:    this.filters.search,
      inStock:   this.filters.inStock,
      minPrice:  this.filters.minPrice,
      maxPrice:  this.filters.maxPrice,
      sort:      this.filters.sort,
      order:     this.filters.order,
    });
    const page  = this.filters.page ?? 1;
    const limit = this.filters.limit ?? 24;
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    this.products.set(filtered.slice(start, start + limit));
    this.totalCount.set(total);
    this.totalPages.set(pages);
    this.usingStatic.set(true);
    this.error.set('');
    this.loading.set(false);
  }

  selectCategory(id: string) {
    this.filters.category = id;
    this.filters.page     = 1;
    this.load();
  }

  onSearch(term: string) {
    this.filters.search = term;
    this.filters.page   = 1;
    this.load();
  }

  onSort(val: string) {
    const [sort, order] = val.split(':');
    this.filters.sort   = sort;
    this.filters.order  = order as 'asc' | 'desc';
    this.load();
  }

  goPage(p: number) {
    if (p < 1 || p > this.totalPages()) return;
    this.filters.page = p;
    this.load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(p: Product) {
    this.cart.addItem(p);
    this.addedId.set(p._id);
    setTimeout(() => this.addedId.set(''), 1800);
  }

  get pages() {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  discount(p: Product) {
    if (!p.originalPrice || p.originalPrice <= p.price) return 0;
    return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  }
}
