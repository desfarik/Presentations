import { AuthenticationService, UserInfo } from '../service/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private angularFireAuth: AngularFireAuth, private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.angularFireAuth.idTokenResult.pipe(
      take(1),
      map(token => {
        if (token) {
          this.authenticationService.setUserInfo(token.claims as UserInfo);
          return true;
        }
        return this.router.parseUrl('/login');
      }));
  }

}
