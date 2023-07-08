import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
   baseUrl:string=" http://localhost:3000/";
  constructor(private http:HttpClient) { }
  getDataFromServer(endPoint:string){
    const url=this.baseUrl+endPoint;
    return this.http.get(url);
  }
}
