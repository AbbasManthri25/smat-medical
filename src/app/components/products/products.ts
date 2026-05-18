import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  activeTab = 'med';

  constructor(private inquiry: InquiryService) {}

  requestQuote(productName: string, category = '') {
    this.inquiry.requestQuote(productName, category);
  }

  tabs = [
    {
      id: 'med',
      categories: [
        {
          title: 'Small Medical Products', icon: 'fas fa-box-open', iconColor: 'blue',
          products: [
            { icon: 'fas fa-heart-pulse',  name: 'BP Monitor',          desc: 'Blood pressure monitoring' },
            { icon: 'fas fa-lungs',        name: 'Pulse Oximeter',      desc: 'SpO₂ & heart rate' },
            { icon: 'fas fa-syringe',      name: 'Syringe',             desc: 'Injection & medication' },
            { icon: 'fas fa-droplet',      name: 'IV Set',              desc: 'Drip administration' },
            { icon: 'fas fa-hand-paper',   name: 'Gloves',              desc: 'Medical protection' },
            { icon: 'fas fa-mask-face',    name: 'Surgical Mask',       desc: 'Safety & protection' },
            { icon: 'fas fa-wind',         name: 'Nebulizer',           desc: 'Breathing treatment' },
            { icon: 'fas fa-thermometer',  name: 'Digital Thermometer', desc: 'Temperature check' },
            { icon: 'fas fa-stethoscope',  name: 'Stethoscope',         desc: 'Heart & lung check' },
            { icon: 'fas fa-weight-scale', name: 'Weighing Machine',    desc: 'Patient weight check' },
            { icon: 'fas fa-vial',         name: 'Glucometer',          desc: 'Blood sugar testing' },
            { icon: 'fas fa-pump-soap',    name: 'Suction Catheter',    desc: 'ICU use' },
            { icon: 'fas fa-bandage',      name: 'Dressing Kit',        desc: 'Wound care' },
            { icon: 'fas fa-wave-square',  name: 'ECG Electrodes',      desc: 'ECG testing' },
          ]
        },
        {
          title: 'Medium Medical Products', icon: 'fas fa-boxes-stacked', iconColor: 'blue',
          products: [
            { icon: 'fas fa-wave-square',    name: 'ECG Machine',          desc: '12-lead heart testing' },
            { icon: 'fas fa-monitor-waveform', name: 'Patient Monitor',    desc: 'Vital signs monitoring' },
            { icon: 'fas fa-syringe',        name: 'Syringe Pump',         desc: 'ICU medicine injection' },
            { icon: 'fas fa-droplet',        name: 'Infusion Pump',        desc: 'Controlled medicine flow' },
            { icon: 'fas fa-pump-medical',   name: 'Suction Machine',      desc: 'Fluid suction' },
            { icon: 'fas fa-bolt',           name: 'Defibrillator',        desc: 'Cardiac emergency' },
            { icon: 'fas fa-circle-radiation', name: 'Autoclave',          desc: 'Sterilization' },
            { icon: 'fas fa-baby',           name: 'Fetal Doppler',        desc: 'Pregnancy monitoring' },
            { icon: 'fas fa-lightbulb',      name: 'Examination Light',    desc: 'Patient examination' },
            { icon: 'fas fa-bed',            name: 'Hospital Cot',         desc: 'Patient bed' },
            { icon: 'fas fa-wheelchair',     name: 'Wheelchair',           desc: 'Patient movement' },
            { icon: 'fas fa-lungs',          name: 'Oxygen Concentrator',  desc: 'Oxygen support' },
            { icon: 'fas fa-toilet-paper',   name: 'Urine Bag',            desc: 'Patient care' },
          ]
        },
        {
          title: 'High-Value Products', icon: 'fas fa-star', iconColor: 'purple',
          products: [
            { icon: 'fas fa-monitor-waveform', name: 'Multipara Monitor', desc: 'ICU multi-parameter' },
            { icon: 'fas fa-bed-pulse',        name: 'ICU Bed',           desc: 'Intensive care' },
            { icon: 'fas fa-lungs-virus',      name: 'Ventilator',        desc: 'Breathing support' },
            { icon: 'fas fa-masks-theater',    name: 'CPAP / BiPAP',      desc: 'Respiratory support' },
            { icon: 'fas fa-x-ray',            name: 'Portable X-Ray',    desc: 'Bedside imaging' },
            { icon: 'fas fa-table-cells-large',name: 'OT Table',          desc: 'Operation theatre' },
            { icon: 'fas fa-sun',              name: 'Surgical Light',    desc: 'OT lighting' },
            { icon: 'fas fa-filter',           name: 'Dialysis Machine',  desc: 'Kidney treatment' },
            { icon: 'fas fa-gas-pump',         name: 'Anesthesia Machine',desc: 'Surgery support' },
          ]
        },
        {
          title: 'Very High-End Products', icon: 'fas fa-gem', iconColor: 'red',
          products: [
            { icon: 'fas fa-circle-dot',   name: 'CT Scan',             desc: 'Body imaging' },
            { icon: 'fas fa-magnet',       name: 'MRI Scanner',         desc: 'Advanced imaging' },
            { icon: 'fas fa-heart',        name: 'Cath Lab',            desc: 'Cardiac procedures' },
            { icon: 'fas fa-camera-rotate',name: 'C-Arm Machine',       desc: 'Intraoperative imaging' },
            { icon: 'fas fa-x-ray',        name: 'Digital X-Ray System',desc: 'Advanced radiology' },
            { icon: 'fas fa-ribbon',       name: 'Mammography',         desc: 'Breast imaging' },
            { icon: 'fas fa-lungs-virus',  name: 'ICU Ventilator System',desc: 'Critical care' },
            { icon: 'fas fa-house-medical-circle-check', name: 'Modular OT Setup', desc: 'Complete operation theatre' },
          ]
        },
      ]
    },
    {
      id: 'den',
      categories: [
        {
          title: 'Small Dental Products', icon: 'fas fa-box-open', iconColor: 'blue',
          products: [
            { icon: 'fas fa-hand-paper',     name: 'Dental Gloves',     desc: 'Protection & safety' },
            { icon: 'fas fa-mask-face',      name: 'Mouth Mask',        desc: 'Infection control' },
            { icon: 'fas fa-pump-soap',      name: 'Saliva Ejector',    desc: 'Fluid removal' },
            { icon: 'fas fa-drill',          name: 'Dental Burs',       desc: 'Rotary cutting tools' },
            { icon: 'fas fa-circle',         name: 'Composite Filling', desc: 'Tooth restoration' },
            { icon: 'fas fa-mortar-pestle',  name: 'Dental Cement',     desc: 'Bonding & luting' },
            { icon: 'fas fa-lightbulb',      name: 'Curing Light',      desc: 'Composite polymerization' },
          ]
        },
        {
          title: 'Medium Dental Products', icon: 'fas fa-boxes-stacked', iconColor: 'blue',
          products: [
            { icon: 'fas fa-vibrate',           name: 'Ultrasonic Scaler',    desc: 'Tartar removal' },
            { icon: 'fas fa-rotate',            name: 'Dental Micromotor',    desc: 'High/low speed handpiece' },
            { icon: 'fas fa-location-crosshairs', name: 'Apex Locator',       desc: 'Root canal length detection' },
            { icon: 'fas fa-arrows-rotate',     name: 'Endomotor',            desc: 'Rotary endodontics' },
            { icon: 'fas fa-wind',              name: 'Air Compressor',       desc: 'Dental unit air supply' },
            { icon: 'fas fa-pump-medical',      name: 'Suction Unit',         desc: 'Oral suction' },
            { icon: 'fas fa-x-ray',             name: 'Portable Dental X-Ray',desc: 'Chair-side imaging' },
          ]
        },
        {
          title: 'High Dental Products', icon: 'fas fa-star', iconColor: 'purple',
          products: [
            { icon: 'fas fa-chair',         name: 'Dental Chair',     desc: 'Patient treatment unit' },
            { icon: 'fas fa-x-ray',         name: 'RVG Sensor',       desc: 'Digital dental X-ray' },
            { icon: 'fas fa-circle-radiation', name: 'Autoclave',     desc: 'Instrument sterilization' },
            { icon: 'fas fa-qrcode',        name: 'Intraoral Scanner',desc: 'Digital impressions' },
          ]
        },
        {
          title: 'Very High-End Dental Products', icon: 'fas fa-gem', iconColor: 'red',
          products: [
            { icon: 'fas fa-panorama', name: 'OPG Machine',   desc: 'Panoramic dental X-ray' },
            { icon: 'fas fa-cube',     name: 'CBCT Scanner',  desc: '3D cone beam CT' },
            { icon: 'fas fa-print',    name: 'CAD/CAM System',desc: 'Digital crown & bridge milling' },
          ]
        },
      ]
    },
    {
      id: 'lab',
      categories: [
        {
          title: 'Lab & Diagnostic Products', icon: 'fas fa-flask', iconColor: 'teal',
          products: [
            { icon: 'fas fa-rotate',    name: 'Centrifuge',           desc: 'Lab sample separation' },
            { icon: 'fas fa-microscope',name: 'Microscope',           desc: 'Lab analysis' },
            { icon: 'fas fa-vial-virus',name: 'Semi-Auto Analyzer',   desc: 'Blood testing' },
            { icon: 'fas fa-robot',     name: 'Fully Auto Analyzer',  desc: 'Lab diagnostics' },
            { icon: 'fas fa-droplet',   name: 'Hb Meter',             desc: 'Hemoglobin testing' },
            { icon: 'fas fa-vial',      name: 'Biochemistry Analyzer',desc: 'Blood chemistry' },
          ]
        },
      ]
    },
  ];
}
