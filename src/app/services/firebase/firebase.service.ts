import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { User } from '../../models/user.model';
import { getDoc, setDoc, doc, getFirestore } from '@angular/fire/firestore';
import { Comentario } from 'src/app/models/comentario';
import { collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth)
  //ACCEDER
  signIn(user: User) { return signInWithEmailAndPassword(getAuth(), user.email, user.password) }

  //CREAR
  signUp(user: User) { return createUserWithEmailAndPassword(getAuth(), user.email, user.password) }
  //registrarse(user: User){return createUserWithEmailAndPassword(getAuth(),user.email, user.password)}
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //MEODOS PARA CARGAR COMENTARIOS
  addComentario(comentario: Comentario) {
    const firestore = getFirestore();
    return addDoc(collection(firestore, 'comentarios'), {
      ...comentario,
      fecha: new Date()
    });
  }

  // Metodo para devolver los comentarios de un lugar
  async getComentariosPorLugar(xid: number): Promise<Comentario[]> {
    const db = getFirestore();
    const comentariosRef = collection(db, 'comentarios');
    const q = query(comentariosRef, where('xid', '==', xid.toString()));

    const snapshot = await getDocs(q);

    const comentarios: Comentario[] = snapshot.docs.map(doc => ({
      id: doc.id,

      ...(doc.data() as Comentario)
    }));

    console.log(comentarios);

    return comentarios;
  }

  //Motodo para devolver comentarios del usuario logueado 
  getComentariosPorUsuario(uid: string): Promise<Comentario[]> {
    const db = getFirestore();
    const comentariosRef = collection(db, 'comentarios');
    const q = query(comentariosRef, where('uid', '==', uid));
    return getDocs(q).then(snapshot =>
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comentario))
    );
  }
  //Eliminar comentario de firebase
  async deleteComentario(id: string): Promise<void> {
    const db = getFirestore();
    const comentarioRef = doc(db, 'comentarios', id);
    await deleteDoc(comentarioRef);
  }
}
