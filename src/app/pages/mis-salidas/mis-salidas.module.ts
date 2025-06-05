import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisSalidasPageRoutingModule } from './mis-salidas-routing.module';
import { MisSalidasPage } from './mis-salidas.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisSalidasPageRoutingModule
  ],
  declarations: [MisSalidasPage]
})
export class MisSalidasPageModule {}
