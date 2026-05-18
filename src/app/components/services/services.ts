import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  constructor(private inquiry: InquiryService) {}
  requestAMC() { this.inquiry.requestQuote('AMC Contract', 'AMC / CMC Contract'); }
  requestCMC() { this.inquiry.requestQuote('CMC Contract (Comprehensive)', 'AMC / CMC Contract'); }
  services = [
    {
      icon: 'fas fa-truck-medical', title: 'Medical Equipment Supply',
      desc: 'Order-based supply of medical equipment — small consumables to high-end hospital systems. All major brands available.',
      items: ['Small, medium & high-value equipment', 'Multi-brand sourcing', 'Hospitals, clinics & diagnostics', 'Quick order fulfillment']
    },
    {
      icon: 'fas fa-tooth', title: 'Dental Equipment Supply',
      desc: 'Complete dental clinic setup — from consumables and handpieces to dental chairs, RVG sensors, and CBCT machines.',
      items: ['Dental consumables', 'Chair units & compressors', 'Digital imaging (RVG, OPG, CBCT)', 'CAD/CAM & intraoral scanners']
    },
    {
      icon: 'fas fa-flask', title: 'Lab & Diagnostic Supply',
      desc: 'Laboratory diagnostic equipment supply for hospitals, clinics, and standalone diagnostic centers.',
      items: ['Centrifuge & microscopes', 'Semi & fully auto analyzers', 'Biochemistry analyzers', 'Hematology equipment']
    },
  ];

  amcFeatures = [
    { check: true,  text: 'Periodic equipment checkup' },
    { check: true,  text: 'Calibration & alignment' },
    { check: true,  text: 'Cleaning & sanitization' },
    { check: true,  text: 'Basic service & tuning' },
    { check: true,  text: 'Technician visits' },
    { check: false, text: 'Spare parts charged separately' },
  ];

  cmcFeatures = [
    'All AMC services included',
    'Spare parts included',
    'Repair & troubleshooting',
    'Component replacement support',
    'Priority technician visits',
    'Ideal for ventilators, monitors, dental chairs, X-ray',
  ];
}
