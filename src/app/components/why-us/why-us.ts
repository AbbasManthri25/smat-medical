import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-us',
  imports: [CommonModule],
  templateUrl: './why-us.html',
  styleUrl: './why-us.scss',
})
export class WhyUs {
  cards = [
    { icon: 'fas fa-user-graduate',  title: 'Biomedical Expertise',    desc: 'Founded by a Biomedical Engineer — we understand technical specs of every product we supply.' },
    { icon: 'fas fa-tags',           title: 'Multi-Brand Range',        desc: '40+ brands — medical and dental — giving you the best option for your budget and requirement.' },
    { icon: 'fas fa-boxes-stacked',  title: 'Complete Product Range',   desc: 'From low-cost consumables to crore-level imaging systems — all tiers covered.' },
    { icon: 'fas fa-headset',        title: 'After-Sales Support',      desc: 'AMC & CMC contracts keep your equipment in top working condition with scheduled service.' },
    { icon: 'fas fa-file-invoice',   title: 'Easy Quotation',           desc: 'Quick WhatsApp or form-based inquiry — get product quotations fast without lengthy processes.' },
    { icon: 'fas fa-handshake',      title: 'Trusted Supply Partner',   desc: 'Honest pricing, genuine products, reliable delivery — built to be your long-term partner.' },
  ];
}
