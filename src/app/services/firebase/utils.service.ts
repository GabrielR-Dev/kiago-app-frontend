import { Injectable, inject } from '@angular/core';
import {
  IonSpinner,
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  //constructor() { }
  //loadingCtrl=inject(LoadingController)
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  } //toast
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  getFromLocalStorageItem(key: string) {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error parsing localStorage item', error);
      return null;
    }
  }
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }
  
}

