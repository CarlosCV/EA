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
export class ForgotPasswordService {
  constructor(private http: HttpClient) { }

  forgotPassword(jsonData): Observable<any>{
    return this.http.post<any>(environment.backendApis + 'api/forgotpassword', JSON.stringify(jsonData), httpOptions);
  }


}
