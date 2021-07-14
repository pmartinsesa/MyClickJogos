import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DeathModalComponent } from './death-modal/death-modal.component';
import { FruitDirective } from './fruit-directive/fruit.directive';
import { SnakeDirective } from './snake-directive/snake.directive';
import { SnakeGameComponent } from './snake-game.component';
import { SnakeGameRoutingModule } from './snake-game.routing.module';


@NgModule({
  imports: [
    CommonModule,
    SnakeGameRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    SnakeGameComponent,
    DeathModalComponent,
    FruitDirective,
    SnakeDirective
  ],
  exports: [SnakeGameComponent]
})
export class SnakeGameModule { }
