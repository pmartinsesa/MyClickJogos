import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SnakeGameComponent } from './snake-game.component';
import { SnakeGameRoutingModule } from './snake-game.routing.module';

@NgModule({
  imports: [
    CommonModule,
    SnakeGameRoutingModule
  ],
  declarations: [SnakeGameComponent],
  exports: [SnakeGameComponent]
})
export class SnakeGameModule { }
