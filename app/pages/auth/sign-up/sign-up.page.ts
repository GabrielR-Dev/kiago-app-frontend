
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonHeader, IonContent, IonToolbar } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/services/firebase.service';
import { inject } from '@angular/core';
import { User } from 'src/app/models/user.module';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  standalone:false,
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit{
  uid=new FormGroup('');
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    //name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });
  // constructor() { }
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
       // await this this.firebaseSvc.updateUser(this.form.value.name);
          console.log(res);
        }).catch(error => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: error.mesage,
            duration: 2500,
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
    //console.log(this.form.value)
  }
  async setUserInfo(uid:string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      let path= `users/${uid}`;
      delete this.form.value.password;
      this.firebaseSvc.setDocument(path, this.form.value).then(res => {
          //console.log(res);
          this.utilsSvc.saveInLocalStorage('user',this.form.value);

          this.utilsSvc.routerLink('/main/home');
          this.form.reset();
        }).catch(error => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: error.mesage,
            duration: 2500,
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
    //console.log(this.form.value)
  }
  
}

