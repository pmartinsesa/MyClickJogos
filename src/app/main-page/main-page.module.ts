import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { MainPageRoutingModule } from './main-page.routing.module';
import { MainPageComponent } from './main-page.component';
import { SliderComponent } from './slider/slider.component';
import { CardsComponent } from './cards/cards.component';

@NgModule({
  declarations: [
    SliderComponent,
    CardsComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    CarouselModule.forRoot()
  ],
  exports: [
    MainPageComponent
  ]
})
export class MainPageModule { }
