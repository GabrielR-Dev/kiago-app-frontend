import { inject, Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth';
import {User} from '../../models/user.model';
import{getDoc,setDoc,doc, getFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth=inject(AngularFireAuth)
  //ACCEDER
  signIn(user: User){return signInWithEmailAndPassword(getAuth(),user.email, user.password)}

  //CREAR
  signUp(user: User){return createUserWithEmailAndPassword(getAuth(),user.email, user.password)}
  //registrarse(user: User){return createUserWithEmailAndPassword(getAuth(),user.email, user.password)}
  setDocument(path:string, data:any){
    return setDoc(doc(getFirestore(),path),data);
  }
  async getDocument(path:string){
    return (await getDoc(doc(getFirestore(),path))).data();
  }
}
