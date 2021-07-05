import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { CardsComponent } from './cards/cards.component';
import { MainPageComponent } from './main-page.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    SliderComponent,
    CardsComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot()
  ],
  exports: [
    MainPageComponent
  ]
})
export class MainPageModule { }
