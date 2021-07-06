import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './main-page.component';

const MainPageRoutes: Routes = [
  { path: '', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(MainPageRoutes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
