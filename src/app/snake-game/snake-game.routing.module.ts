import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SnakeGameComponent } from './snake-game.component';

const SnakeGameRoutes: Routes = [
  { path: '', component: SnakeGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(SnakeGameRoutes)],
  exports: [RouterModule]
})
export class SnakeGameRoutingModule { }
