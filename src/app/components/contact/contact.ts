import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InquiryService } from '../../services/inquiry.service';
import { environment } from '../../../environments/environment';

const NOTIFY_EMAIL     = 'abbasabbas4514@gmail.com';
const BACKEND_URL      = `${environment.apiUrl}/contact`;
// Get your free key at https://web3forms.com — enter abbasabbas4514@gmail.com
const WEB3FORMS_KEY    = 'YOUR_WEB3FORMS_ACCESS_KEY';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  submitting = false;
  submitted  = false;
  hasError   = false;

  form = {
    name: '', phone: '', email: '',
    organization: '', category: '', product: '', message: ''
  };

  methods = [
    { icon: 'fab fa-whatsapp',     cls: 'ico-wa', label: 'WhatsApp', value: '+91 98765 43210',      href: 'https://wa.me/919876543210', target: '_blank' },
    { icon: 'fas fa-phone',        cls: 'ico-ph', label: 'Phone',     value: '+91 98765 43210',      href: 'tel:+919876543210' },
    { icon: 'fas fa-envelope',     cls: 'ico-em', label: 'Email',     value: 'info@smatmedical.com', href: 'mailto:info@smatmedical.com' },
    { icon: 'fas fa-location-dot', cls: 'ico-lo', label: 'Location',  value: 'Tamil Nadu, India',    href: '#' },
  ];

  categories = [
    'Medical Equipment', 'Dental Equipment',
    'Lab & Diagnostic', 'AMC / CMC Contract', 'Multiple Categories'
  ];

  constructor(private inquiry: InquiryService) {
    effect(() => {
      const p = this.inquiry.selectedProduct();
      const c = this.inquiry.selectedCategory();
      if (p) this.form.product  = p;
      if (c) this.form.category = c;
    });
  }

  async submitForm() {
    if (!this.form.name.trim() || !this.form.phone.trim()) return;
    this.submitting = true;
    this.hasError   = false;

    // 1) Try backend API (Node.js Nodemailer — works when backend is running)
    try {
      const res = await fetch(BACKEND_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...this.form }),
      });
      if (res.ok) {
        this.submitted = true;
        this.resetFields();
        this.submitting = false;
        return;
      }
    } catch { /* backend offline — fall through */ }

    // 2) Fallback: Web3Forms (no email verification required, works instantly)
    if (WEB3FORMS_KEY && WEB3FORMS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key:       WEB3FORMS_KEY,
            subject:          `New Inquiry — ${this.form.name} | SMAT Medical`,
            from_name:        'SMAT Medical Website',
            Customer_Name:    this.form.name,
            Phone:            this.form.phone,
            Email:            this.form.email        || '—',
            Organization:     this.form.organization || '—',
            Category:         this.form.category     || '—',
            Product_Required: this.form.product      || '—',
            Details:          this.form.message      || '—',
          }),
        });
        const data = await res.json();
        if (data.success) {
          this.submitted = true;
          this.resetFields();
          this.submitting = false;
          return;
        }
      } catch { /* fall through */ }
    }

    this.hasError   = true;
    this.submitting = false;
  }

  /** Guaranteed fallback — opens the device mail app pre-filled with order details */
  sendViaMailApp() {
    const subject = `New Order — ${this.form.name} | SMAT Medical`;
    const body = [
      `Customer : ${this.form.name}`,
      `Phone    : ${this.form.phone}`,
      `Email    : ${this.form.email        || '—'}`,
      `Hospital : ${this.form.organization || '—'}`,
      `Category : ${this.form.category     || '—'}`,
      `Product  : ${this.form.product      || '—'}`,
      `Details  : ${this.form.message      || '—'}`,
    ].join('\n');

    // Directs the inquiry ONLY to the owner's notification email
    window.location.href =
      `mailto:${NOTIFY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  resetForm()   { this.submitted = false; this.hasError = false; }
  private resetFields() {
    this.form = { name: '', phone: '', email: '', organization: '', category: '', product: '', message: '' };
    this.inquiry.clear();
  }

  get waLink() {
    const msg = this.form.product
      ? `Hi SMAT Medical, I need a quote for: ${this.form.product}`
      : 'Hi SMAT Medical, I need a quotation for medical equipment.';
    return `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
  }
}
