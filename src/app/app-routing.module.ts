import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthPage } from './pages/auth-reg/auth/auth.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth-reg/auth/auth.module').then(m => m.AuthPageModule)
  },


  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./pages/auth-reg/register/register.module').then(m => m.RegisterPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
