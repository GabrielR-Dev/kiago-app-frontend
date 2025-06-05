import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitadosPageRoutingModule } from './visitados-routing.module';

import { VisitadosPage } from './visitados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitadosPageRoutingModule
  ],
  declarations: [VisitadosPage]
})
export class VisitadosPageModule {}
