import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenumenuPage } from './menumenu.page';

const routes: Routes = [
  {
    path: '',
    component: MenumenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenumenuPageRoutingModule {}
