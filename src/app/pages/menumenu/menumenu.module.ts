import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenumenuPageRoutingModule } from './menumenu-routing.module';

import { MenumenuPage } from './menumenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenumenuPageRoutingModule
  ],
  declarations: [MenumenuPage]
})
export class MenumenuPageModule {}
