import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthPage } from './auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,

  ],
  exports: [],
  declarations: [AuthPage]
})
export class AuthPageModule { }
