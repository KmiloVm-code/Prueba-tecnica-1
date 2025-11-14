import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private apiService: ApiService) {}

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.apiService.post<User>('/auth/login', credentials);
  }

  logout(): Observable<void> {
    return this.apiService.post<void>('/auth/logout', {});
  }

  register(userInfo: { username: string; email: string; password: string }): Observable<User> {
    return this.apiService.post<User>('/auth/register', userInfo);
  }

  getCurrentUser(): Observable<User> {
    return this.apiService.get<User>('/auth/me');
  }
}
