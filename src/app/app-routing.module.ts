import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth-reg/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth-reg/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',

    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)

  },
  {
    path: 'view-lugar/:id',
    loadChildren: () => import('./pages/view-lugar/view-lugar.module').then(m => m.ViewLugarPageModule),
    canActivate: [AuthGuard]
  },
  /*{
    path: 'mis-salidas',
    loadChildren: () => import('./pages/visitados/visitados.module').then(m => m.VisitadosPageModule),
    canActivate: [AuthGuard]
  },*/


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
