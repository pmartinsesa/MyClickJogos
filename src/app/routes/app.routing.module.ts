import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'snake',
    loadChildren: () => import('../snake-game/snake-game.module').then(mod => mod.SnakeGameModule),
  },
  {
    path: 'tictactoe',
    loadChildren: () => import('../tic-tac-toe/tic-tac-toe.module').then(mod => mod.TicTacToeModule),
  },
  {
    path: 'home',
    loadChildren: () => import('../main-page/main-page.module').then(mod => mod.MainPageModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
