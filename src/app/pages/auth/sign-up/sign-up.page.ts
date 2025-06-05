
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from '../../../services/firebase/utils.service';


@Component({
  standalone: false,
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit {
  uid = new FormGroup('');
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });
  constructor(private firebaseSvc :FirebaseService, private utilsSvc : UtilsService) { }
  ngOnInit() { }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        // await this this.firebaseSvc.updateUser(this.form.value.name);
        console.log(res);
        this.utilsSvc.presentToast({
          message: '¡Registro exitoso! Ahora puedes iniciar sesión.',
          duration: 1000,
          position: 'middle',
          color: 'success',
          icon: 'checkmark-circle-outline',
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      })
    }
  }


  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      let path = `users/${uid}`;
      delete this.form.value.password;
      this.firebaseSvc.setDocument(path, this.form.value).then(res => {
        //console.log(res);
        this.utilsSvc.saveInLocalStorage('user', this.form.value);

        this.utilsSvc.routerLink('/login');
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

