import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  columns = [
    {
      title: 'Products',
      links: [
        { label: 'Medical Equipment', href: '#products' },
        { label: 'Dental Equipment',  href: '#products' },
        { label: 'Lab Equipment',     href: '#products' },
        { label: 'ICU Equipment',     href: '#products' },
        { label: 'Consumables',       href: '#products' },
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Equipment Supply',   href: '#services' },
        { label: 'AMC Contract',       href: '#services' },
        { label: 'CMC Contract',       href: '#services' },
        { label: 'Calibration',        href: '#services' },
        { label: 'Technical Support',  href: '#services' },
      ]
    },
    {
      title: 'Contact',
      links: [
        { label: '+91 98765 43210',       href: 'tel:+919876543210' },
        { label: 'info@smatmedical.com',  href: 'mailto:info@smatmedical.com' },
        { label: 'Tamil Nadu, India',     href: '#' },
        { label: 'WhatsApp Us',           href: 'https://wa.me/919876543210' },
        { label: 'Send Inquiry',          href: '#contact' },
      ]
    },
  ];
}
