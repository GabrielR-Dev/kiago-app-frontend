import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLugarPage } from './view-lugar.page';

const routes: Routes = [
  { path: '', component: ViewLugarPage },
  {
    path: 'ir/:lat/:lng',
    loadChildren: () => import('../ir/ir.module').then(m => m.IrPageModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLugarPageRoutingModule { }
