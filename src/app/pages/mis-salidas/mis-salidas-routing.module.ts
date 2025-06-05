import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisSalidasPage } from './mis-salidas.page';

const routes: Routes = [
  {
    path: '',
    component: MisSalidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisSalidasPageRoutingModule {}
