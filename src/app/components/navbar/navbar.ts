import { Component, HostListener } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService }   from '../../services/cart.service';
import { AuthService }   from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isScrolled = false;
  menuOpen   = false;

  constructor(public cart: CartService, public auth: AuthService) {}

  @HostListener('window:scroll')
  onScroll() { this.isScrolled = window.scrollY > 50; }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }
}
