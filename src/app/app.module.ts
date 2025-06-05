import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//firebase
import{AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
