import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sectors',
  imports: [CommonModule],
  templateUrl: './sectors.html',
  styleUrl: './sectors.scss',
})
export class Sectors {
  sectors = [
    { ico: '🏥', name: 'Hospitals' },
    { ico: '🩺', name: 'Medical Clinics' },
    { ico: '🦷', name: 'Dental Clinics' },
    { ico: '🔬', name: 'Diagnostic Centers' },
    { ico: '💪', name: 'Physiotherapy Centers' },
  ];
}
