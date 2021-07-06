import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TicTacToeComponent } from './tic-tac-toe.component';
import { TicTacToeRoutingModule } from './tic-tac-toe.routing.module';

@NgModule({
  imports: [
    CommonModule,
    TicTacToeRoutingModule
  ],
  declarations: [TicTacToeComponent],
  exports: [TicTacToeComponent]
})
export class TicTacToeModule { }
