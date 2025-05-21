import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthPage } from './pages/auth-reg/auth/auth.page';
import { ViewLugarPage } from './pages/view-lugar/view-lugar.page';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth-reg/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth-reg/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'view-lugar/:id',
    loadChildren: () => import('./pages/view-lugar/view-lugar.module').then(m => m.ViewLugarPageModule),
    canActivate: [AuthGuard]
  },
    path: 'menu-mapa',      
    loadChildren: () => import('./menu-mapa/menu-mapa.module').then( m => m.MenuMapaPageModule)
  }
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
