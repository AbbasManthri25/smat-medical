import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  stats = [
    { num: '78+', lbl: 'Product Types' },
    { num: '40+', lbl: 'Partner Brands' },
    { num: '2',   lbl: 'Segments: Medical + Dental' },
    { num: 'AMC', lbl: '& CMC Contracts' },
  ];

  features = [
    { icon: 'fas fa-hospital',   title: 'Medical Equipment Supply',    desc: 'From BP monitors to ICU ventilators — small, medium, and high-value hospital equipment, all major brands.' },
    { icon: 'fas fa-tooth',      title: 'Dental Equipment Supply',     desc: 'Dental consumables, scalers, dental chairs, RVG systems, OPG machines and CBCT scanners.' },
    { icon: 'fas fa-tools',      title: 'AMC & CMC Service Contracts', desc: 'Annual and comprehensive maintenance contracts — calibration, spare parts, and repair support.' },
    { icon: 'fas fa-box-open',   title: 'Order-Based Supply Model',    desc: 'Flexible ordering — from single units to bulk supply for hospitals and clinic chains.' },
  ];
}
