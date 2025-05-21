import { Injectable, inject } from '@angular/core';
import {
  IonSpinner,
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
// La clase UtilsService se encarga de crear y mostrar un loading y un toast
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  //constructor() { }
  //loadingCtrl=inject(LoadingController)
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  } //toast
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
}
