import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

export interface UserInfo {
  admin: boolean,
  email: string,
  name: string,
  picture: string,
  user_id: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user?: UserInfo;
  private _isAdmin = new BehaviorSubject<boolean>(false)
  public isAdmin: Observable<boolean> = this._isAdmin.asObservable();

  constructor() {
  }

  setUserInfo(userInfo: UserInfo) {
    this.user = userInfo;
    this._isAdmin.next(!!this.user?.admin)
  }
}
