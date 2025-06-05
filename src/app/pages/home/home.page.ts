import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor() {}

  // Método para cerrar sesión
  // y redirigir al usuario a la página de inicio
  cerrarSesion() {
    localStorage.clear();
    window.location.href = '/';
  }

}
