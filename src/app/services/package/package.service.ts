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
export class PackageService {
    constructor(private http: HttpClient) { }

    allPackage(type): Observable<any> {
        return this.http.get<any>(environment.backendApis + `api/allPackage?type=${type}`, httpOptions);
    }



}
