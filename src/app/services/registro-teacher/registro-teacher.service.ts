import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
const httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
};
@Injectable({
    providedIn: 'root'
})

export class RegistroTeacherService {
    constructor(private http: HttpClient) { }

    allSpecializations(): Observable<any> {
        return this.http.get(environment.backendApis + "api/allSpecializations", httpHeaders);

    }
    edades(): Observable<any> {
        return this.http.get(environment.backendApis + "api/allTargetGroup", httpHeaders);

    }
    SendInformationTeacher(json): Observable<any> {
        return this.http.post(environment.backendApis + "api/applyForPosition", JSON.stringify(json), httpHeaders)
    }





}
