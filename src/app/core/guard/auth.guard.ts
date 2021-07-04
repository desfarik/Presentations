import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.angularFireAuth.idToken.pipe(
      take(1),
      map((token) => {
        if (token) {
          return true;
        }
        this.router.navigateByUrl('/login');
        return false;
      }))
  }

}
