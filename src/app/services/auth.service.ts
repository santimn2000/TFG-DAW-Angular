import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    console.log("User: ", username + " Password: "+ password)
    return this.http.post<any>('http://localhost:7000/login', { username, password });
  }
}
