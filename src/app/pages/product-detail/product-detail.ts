import { Component, OnInit, signal } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductService }  from '../../services/product.service';
import { CartService }     from '../../services/cart.service';
import { Product }         from '../../models/product.model';

@Component({
  selector: 'app-product-detail-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl:    './product-detail.scss',
})
export class ProductDetailPage implements OnInit {
  product  = signal<Product | null>(null);
  loading  = signal(true);
  error    = signal('');
  added    = signal(false);
  quantity = signal(1);

  constructor(
    private route:      ActivatedRoute,
    private productSvc: ProductService,
    private cart:       CartService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productSvc.getProduct(id).subscribe({
      next:  (p) => { this.product.set(p); this.loading.set(false); },
      error: () => { this.error.set('Product not found.'); this.loading.set(false); },
    });
  }

  addToCart() {
    const p = this.product();
    if (!p) return;
    this.cart.addItem(p, this.quantity());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 2000);
  }

  setQty(n: number) {
    this.quantity.set(Math.max(1, n));
  }

  discount() {
    const p = this.product();
    if (!p?.originalPrice || p.originalPrice <= p.price) return 0;
    return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  }
}
