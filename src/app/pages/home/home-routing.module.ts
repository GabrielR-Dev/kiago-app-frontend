import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ViewLugarPage } from '../view-lugar/view-lugar.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'mapa',
        loadChildren: () => import('../../pages/menu-mapa/menu-mapa.module').then(m => m.MenuMapaPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../../pages/menumenu/menumenu.module').then(m => m.MenumenuPageModule)
      },
      {
        path: 'mis-salidas',
        loadChildren: () => import('../../pages/tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      { path: '', redirectTo: 'menu', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
