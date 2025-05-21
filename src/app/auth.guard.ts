import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      map(user => {
        const token = localStorage.getItem('userToken');
        if (user && token) {
          return true;
        } else {
          // Redirige al login si no hay usuario o token
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}
