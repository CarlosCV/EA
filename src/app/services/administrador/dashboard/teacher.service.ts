import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
};

@Injectable({
    providedIn: 'root'
})
export class TeacherService {
    constructor(private http: HttpClient) { }


    AcceptRejectTeachers(json): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/teachers/approve', JSON.stringify(json), httpOptions);
    }

}
