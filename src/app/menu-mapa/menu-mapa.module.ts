import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuMapaPageRoutingModule } from './menu-mapa-routing.module';

import { MenuMapaPage } from './menu-mapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuMapaPageRoutingModule
  ],
  declarations: [MenuMapaPage]
})
export class MenuMapaPageModule {}
