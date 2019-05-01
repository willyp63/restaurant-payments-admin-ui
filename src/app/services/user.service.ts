import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private readonly http: HttpClient) { }

  addUser(user: Partial<User>): Observable<User> {
    return this.http.post(`${environment.apiUrl}/user`, user) as Observable<User>;
  }
}
