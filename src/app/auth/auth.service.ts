import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './User';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseUrl = environment.baseUrl+ "api/v1/identity";
  signedin!: boolean;

  constructor(private http: HttpClient) { }

  userLogin(user:User) {
    var reqHeader = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(this.baseUrl+"/login" , user, { headers: reqHeader }).pipe(tap(() => {
      this.signedin = false;
    }));
  }

  userRegister(user:User) {
    var reqHeader = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(this.baseUrl+"/register" , user, { headers: reqHeader }).pipe(tap(() => {
      this.signedin = false;
    }));
  }
 
}
