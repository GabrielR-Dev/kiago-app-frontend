import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuMapaPage } from './menu-mapa.page';
import { ProviderLugaresService } from 'src/app/services/lugares/provider-lugares.service';

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
