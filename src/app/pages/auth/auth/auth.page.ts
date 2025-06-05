import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/firebase/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private router: Router
  ) { }

  ngOnInit() { }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc
        .signIn(this.form.value as User)
        .then(async (res) => {
          this.form.reset();

          if (!res.user) {
            throw new Error('Error inesperado: usuario no disponible.');
          }

          const token = await res.user.getIdToken();
          localStorage.setItem('userToken', token);
          localStorage.setItem('userEmail', res.user.email || '');
          localStorage.setItem('userUid', res.user.uid || '');

          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.error(error);
          this.form.reset();
          this.utilsSvc.presentToast({
            message:
              'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
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
