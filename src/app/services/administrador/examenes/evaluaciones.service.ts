import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'
const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
};
@Injectable({
  providedIn: 'root'
})

export class EvaluacionesService {
  constructor(private http: HttpClient) { }


  createExamen(json): Observable<any> {
    return this.http.post<any>(environment.backendApis + 'api/exam/create', JSON.stringify(json), httpHeaders);
}




}
