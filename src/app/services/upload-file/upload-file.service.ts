import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
};
@Injectable({
  providedIn: 'root'
})

export class UploadFileService {
  constructor(private http: HttpClient) { }

  //upload  File
  uploadFile(formData): Promise<any> {
    const response = this.http.post(environment.backendApis + "api/createResource", formData).toPromise()
    return response;
  }
 /*  deleteFile(formData): Promise<any> {
    const response = this.http.delete(environment.backendApis + "api/resource", formData).toPromise()
    return response;
  } */

  deleteFile(json): Observable<any> {
    return this.http.post<any>(environment.backendApis + 'api/delete/resource',JSON.stringify(json),httpOptions);
  }



}
