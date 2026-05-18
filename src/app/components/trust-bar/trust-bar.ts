import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trust-bar',
  imports: [CommonModule],
  templateUrl: './trust-bar.html',
  styleUrl: './trust-bar.scss',
})
export class TrustBar {
  items = [
    { icon: 'fas fa-user-graduate', label: 'Biomedical Engineer Expertise' },
    { icon: 'fas fa-tags',          label: '40+ Brands Supplied' },
    { icon: 'fas fa-tools',         label: 'AMC & CMC Contracts' },
    { icon: 'fas fa-truck-fast',    label: 'Order-Based Supply' },
    { icon: 'fab fa-whatsapp',      label: 'WhatsApp Quick Inquiry' },
  ];
}
