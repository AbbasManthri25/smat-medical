import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InquiryService {
  selectedProduct = signal('');
  selectedCategory = signal('');

  requestQuote(productName: string, category = '') {
    this.selectedProduct.set(productName);
    if (category) this.selectedCategory.set(category);
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  clear() {
    this.selectedProduct.set('');
    this.selectedCategory.set('');
  }
}
