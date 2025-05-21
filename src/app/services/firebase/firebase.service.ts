import { inject, Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth=inject(AngularFireAuth)
  //ACCEDER
  signIn(user: User){return signInWithEmailAndPassword(getAuth(),user.email, user.password)}

  //CREAR
  signUp(user: User){return createUserWithEmailAndPassword(getAuth(),user.email, user.password)}
}
