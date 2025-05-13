import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      /*{VER COMO ESTA EL MAPA
        path: '', //Este es el path va en la pantalla de inicio
        redirectTo: 'menu',
        pathMatch: 'full'
      },
      {    
        path: 'menu',
        loadChildren: () => import(aca va entre '' la direccione del componente.module).then(c => c.SU COMPONENTE)
      },*/
      {
        path: 'mapa',
        loadChildren: () => import('../menu-mapa/menu-mapa.module').then(m => m.MenuMapaPageModule)
      },/*
      {
        path: 'mis-salidas',
        loadChildren: () => import(aca va entre '' la direccione del componente.module).then(m =>  c.SU COMPONENTE)
      },*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
