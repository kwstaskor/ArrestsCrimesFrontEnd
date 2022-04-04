import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Arrest } from './arrest';

@Injectable({
  providedIn: 'root'
})
export class ArrestsService {
  baseUrl = environment.baseUrl + "/api/v1/arrests";

  constructor(private httpService: HttpClient) { }
  token:string|null = localStorage.getItem('userToken');
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}`})
  }

  getAllArrests(): Observable<Arrest[]> {
    return this.httpService.get<Arrest[]>(this.baseUrl,this.httpOptions);
  }
}
