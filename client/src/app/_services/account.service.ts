import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  currUse: User | null;

  constructor(private http: HttpClient) {
    this.currUse = null;
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        this.setCurrentUser(user);
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles =[];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currUse = user;
    this.currentUserSource.next(user);

  }

  logout() {
    localStorage.removeItem('user');
    this.currUse = null;
    this.currentUserSource.next(null);
  }
  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

}
