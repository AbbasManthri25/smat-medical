import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
})
export class Brands {
  segments = [
    {
      title: 'Medical Equipment Brands', icon: 'fas fa-hospital',
      brands: [
        { abbr: 'PH',  name: 'Philips',             cat: 'ECG · Monitor · Ultrasound · MRI' },
        { abbr: 'MR',  name: 'Mindray',              cat: 'Monitor · Ventilator · Pump' },
        { abbr: 'GE',  name: 'GE HealthCare',        cat: 'Ultrasound · CT · Anesthesia' },
        { abbr: 'SI',  name: 'Siemens Healthineers', cat: 'X-Ray · CT Scan' },
        { abbr: 'DR',  name: 'Drager',               cat: 'Ventilator · Anesthesia' },
        { abbr: 'BP',  name: 'BPL Medical',          cat: 'ECG · BP Monitor · Patient Monitor' },
        { abbr: 'OM',  name: 'Omron',                cat: 'BP Monitor · Nebulizer' },
        { abbr: 'BB',  name: 'B Braun',              cat: 'Syringe Pump · Infusion Pump' },
        { abbr: 'ZL',  name: 'Zoll',                 cat: 'Defibrillator' },
        { abbr: 'AL',  name: 'Allengers',            cat: 'X-Ray Machine' },
        { abbr: 'SM',  name: 'Samsung Medison',      cat: 'Ultrasound Scanner' },
        { abbr: 'AC',  name: 'Accu-Chek',            cat: 'Glucometer' },
      ]
    },
    {
      title: 'Dental Equipment Brands', icon: 'fas fa-tooth',
      brands: [
        { abbr: 'WP',  name: 'Woodpecker',       cat: 'Scaler · Apex Locator · X-Ray' },
        { abbr: 'CF',  name: 'Confident',         cat: 'Dental Chair · Autoclave · Compressor' },
        { abbr: 'VT',  name: 'Vatech',            cat: 'OPG · CBCT · RVG' },
        { abbr: 'CS',  name: 'Carestream',        cat: 'RVG · OPG · CBCT' },
        { abbr: 'DS',  name: 'Dentsply Sirona',   cat: 'CAD/CAM System' },
        { abbr: '3M',  name: '3M',                cat: 'Composite · Dental Mask' },
        { abbr: 'GC',  name: 'GC',                cat: 'Dental Cement · Materials' },
        { abbr: 'MN',  name: 'Marathon',          cat: 'Micromotor' },
        { abbr: 'EMS', name: 'EMS',               cat: 'Ultrasonic Scaler' },
        { abbr: 'GN',  name: 'Gnatus',            cat: 'Dental Chair' },
        { abbr: 'IVC', name: 'Ivoclar',           cat: 'Dental Cement' },
        { abbr: 'MD',  name: 'Medit',             cat: 'Intraoral Scanner' },
      ]
    },
  ];
}
