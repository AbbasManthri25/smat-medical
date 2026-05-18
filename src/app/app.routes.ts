import { Routes } from '@angular/router';
import { authGuard  } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomePage),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/catalog/catalog').then(m => m.CatalogPage),
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetailPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.CartPage),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/auth').then(m => m.AuthPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/auth').then(m => m.AuthPage),
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account').then(m => m.AccountPage),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.AdminPage),
    canActivate: [authGuard, adminGuard],
  },
  { path: '**', redirectTo: '' },
];
