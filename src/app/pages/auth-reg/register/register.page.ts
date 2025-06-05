import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../services/register/register.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {
  registerCredentials = {
    nombre: '',
    apellido: '',
    mail: '',
    password: '',
    passwordCheck: ''
  };


  constructor(
    private registerService: RegisterService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  //redirige al login (si fue correcto el registro) y manda los datos a una función que los re enviara a la BD
  redirectLogin(password: string, passwordCheck: string, mail: string) {
    if (this.registerService.finalCheck(password, passwordCheck, mail) === true) {
      console.log("hola")
      //this.router.navigate(['/login']) *lleva al login, saquenle las barras cuando creen la página de login
    }
    else{
      console.log("Registro fallido")
    }
  }

  activarBoton(): boolean {
    const r = this.registerCredentials;
    
    if(r.nombre.length>=1 && r.apellido.length>=1 && r.mail.length>=1 && r.password.length>=6 && r.passwordCheck.length>=6)
      return true;
    else
    return false;
  }
}

