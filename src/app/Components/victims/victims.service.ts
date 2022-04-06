import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Victim } from './victim';

@Injectable({
  providedIn: 'root'
})
export class VictimsService {

  baseUrl = environment.baseUrl + "api/v1/victims";

  constructor(private httpService: HttpClient) { }
  token:string|null = localStorage.getItem('userToken');
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}`})
  }

  getAllVictims(year:number): Observable<Victim[]> {
    return this.httpService.get<Victim[]>(this.baseUrl+year,this.httpOptions);
  }
}
