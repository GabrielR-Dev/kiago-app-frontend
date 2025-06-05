import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonHeader, IonContent, IonToolbar } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/firebase/utils.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  // constructor() { }
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  router = inject(Router);
  ngOnInit() { }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User).then(async res => {
        this.form.value.email = '';
        this.form.value.password = '';

        console.log(res);
        const token = await res.user.getIdToken();
        console.log(token);

        // Guardar datos mínimos en localStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('userEmail', res.user.email || '');
        localStorage.setItem('userUid', res.user.uid || '');

        // Redirigir al mapa después de iniciar sesión correctamente
        this.router.navigate(['/home']);
      }).catch(error => {
        console.error(error);
        this.form.value.email = '';
        this.form.value.password = '';

        // Mostrar mensaje de error si las credenciales son incorrectas
        this.utilsSvc.presentToast({
          message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
          duration: 2500,
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
}
