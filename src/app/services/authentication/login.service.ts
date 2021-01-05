import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  doLogin(credentials): Observable<any>{
    return this.http.post<any>(environment.backendApis + 'api/authenticate', JSON.stringify(credentials), httpOptions);
  }
  getGroup(user): Observable<any>{
    return this.http.get<any>(environment.backendApis + `api/group?idUserHost=${user}&status=PENDING`, httpOptions);
  }

 

}
