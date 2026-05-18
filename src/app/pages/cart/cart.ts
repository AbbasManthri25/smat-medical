import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink }   from '@angular/router';
import { CartService }  from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl:    './cart.scss',
})
export class CartPage {
  constructor(public cart: CartService) {}

  updateQty(id: string, e: Event) {
    const val = parseInt((e.target as HTMLInputElement).value);
    this.cart.updateQuantity(id, val);
  }
}
