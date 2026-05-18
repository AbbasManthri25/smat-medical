import { Component } from '@angular/core';
import { Hero }     from '../../components/hero/hero';
import { TrustBar } from '../../components/trust-bar/trust-bar';
import { About }    from '../../components/about/about';
import { Products } from '../../components/products/products';
import { Brands }   from '../../components/brands/brands';
import { Services } from '../../components/services/services';
import { WhyUs }    from '../../components/why-us/why-us';
import { Sectors }  from '../../components/sectors/sectors';
import { Contact }  from '../../components/contact/contact';

@Component({
  selector: 'app-home-page',
  imports: [Hero, TrustBar, About, Products, Brands, Services, WhyUs, Sectors, Contact],
  template: `
    <app-hero></app-hero>
    <app-trust-bar></app-trust-bar>
    <app-about></app-about>
    <app-products></app-products>
    <app-brands></app-brands>
    <app-services></app-services>
    <app-why-us></app-why-us>
    <app-sectors></app-sectors>
    <app-contact></app-contact>
  `,
})
export class HomePage {}
