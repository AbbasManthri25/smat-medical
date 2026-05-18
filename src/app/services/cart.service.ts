import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  productId: string;
  name:      string;
  price:     number;
  quantity:  number;
  image?:    string;
  category?: string;
  icon?:     string;
}

const CART_KEY = 'smat_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>(this.loadCart());

  readonly items   = this._items.asReadonly();
  readonly count   = computed(() => this._items().reduce((s, i) => s + i.quantity, 0));
  readonly total   = computed(() => this._items().reduce((s, i) => s + i.price * i.quantity, 0));
  readonly isEmpty = computed(() => this._items().length === 0);

  addItem(product: Product, qty = 1) {
    const current = this._items();
    const idx = current.findIndex((i) => i.productId === product._id);
    if (idx >= 0) {
      const updated = [...current];
      updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + qty };
      this.save(updated);
    } else {
      this.save([
        ...current,
        {
          productId: product._id,
          name:      product.name,
          price:     product.price,
          quantity:  qty,
          image:     product.images?.[0],
          category:  product.category,
          icon:      product.icon,
        },
      ]);
    }
  }

  removeItem(productId: string) {
    this.save(this._items().filter((i) => i.productId !== productId));
  }

  updateQuantity(productId: string, qty: number) {
    if (qty < 1) return this.removeItem(productId);
    this.save(this._items().map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)));
  }

  clearCart() {
    this.save([]);
  }

  private save(items: CartItem[]) {
    this._items.set(items);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  private loadCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
