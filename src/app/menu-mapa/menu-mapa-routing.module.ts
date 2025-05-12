import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuMapaPage } from './menu-mapa.page';

const routes: Routes = [
  {
    path: '',
    component: MenuMapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuMapaPageRoutingModule {}
