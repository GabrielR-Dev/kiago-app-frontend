import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  private emailCheck: boolean = false;
  private passCheck: boolean = false;

  constructor() {}

  //checkear que el password y passwordcheck sean iguales
  samePass(pass1: string, pass2: string) {
    if ((pass1 === pass2) && (pass1.length > 6 && pass2.length > 6 )){
      return this.passCheck = true;
    }
    else {
      return this.passCheck = false;
    }
  }

  //deberá autenticar que el mail usado en el registro no haya sido registrado previamente
  mailAuth() {
    return true
  }

  //verifica el estado de ambos checks (el de mail y password) para dejar pasar al usuario
  finalCheck(pass1: string, pass2: string, mail: string) {
    let passCheck: boolean = this.samePass(pass1, pass2);
    let emailCheck: boolean = this.mailAuth();
    let check: boolean;
    if(emailCheck === true && passCheck === true){
      check = true;
      passCheck = false;
      emailCheck = false;
      return check;
    }
    else {
      return false;
    }
  }
}
