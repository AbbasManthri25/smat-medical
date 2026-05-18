import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('cycleEl') cycleEl!: ElementRef<HTMLSpanElement>;

  stats = [
    { num: '78+', lbl: 'Products' },
    { num: '40+', lbl: 'Brands' },
    { num: '5',   lbl: 'Sectors' },
    { num: 'AMC', lbl: '& CMC' },
  ];

  cards = [
    { ico: '💗', name: 'Patient Monitor',  desc: 'ICU & ward monitoring' },
    { ico: '🦷', name: 'Dental Equipment', desc: 'Chairs · Scalers · Imaging' },
    { ico: '🔬', name: 'Lab Products',     desc: 'Diagnostic equipment' },
    { ico: '🫁', name: 'ICU Ventilators',  desc: 'Critical care support' },
  ];

  private words = ['Medical Equipment', 'Dental Solutions', 'ICU Systems', 'Lab Diagnostics', 'Hospital Setup'];
  private wi = 0; private ci = 0; private del = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit() { this.typeNext(); }

  private typeNext() {
    const el = this.cycleEl?.nativeElement;
    if (!el) return;
    const word = this.words[this.wi];
    const cursor = '<span class="cursor">|</span>';
    if (!this.del) {
      this.ci++;
      el.innerHTML = word.slice(0, this.ci) + cursor;
      if (this.ci === word.length) { this.del = true; this.timer = setTimeout(() => this.typeNext(), 1800); return; }
      this.timer = setTimeout(() => this.typeNext(), 75);
    } else {
      this.ci--;
      el.innerHTML = word.slice(0, this.ci) + cursor;
      if (this.ci === 0) { this.del = false; this.wi = (this.wi + 1) % this.words.length; }
      this.timer = setTimeout(() => this.typeNext(), 40);
    }
  }

  ngOnDestroy() { if (this.timer) clearTimeout(this.timer); }
}
