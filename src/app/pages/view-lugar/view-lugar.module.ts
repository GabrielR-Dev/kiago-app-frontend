import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ViewLugarPageRoutingModule } from './view-lugar-routing.module';

import { ViewLugarPage } from './view-lugar.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewLugarPageRoutingModule,
    IonicModule.forRoot()
  ],
  declarations: [ViewLugarPage]
})
export class ViewLugarPageModule {}
