import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TicTacToeComponent } from './tic-tac-toe.component';

const TicTacToeRoutes: Routes = [
  { path: '', component: TicTacToeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(TicTacToeRoutes)],
  exports: [RouterModule]
})
export class TicTacToeRoutingModule { }
