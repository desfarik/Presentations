import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.angularFireAuth.idToken.pipe(
      take(1),
      map(token => {
        if (token) {
          return this.router.parseUrl('/');
        }
        return true;
      }));
  }

}
