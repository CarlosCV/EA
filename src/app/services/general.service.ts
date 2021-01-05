import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
};

@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    constructor(private http: HttpClient) { }
    allUserbyRole(json): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/allUser', JSON.stringify(json), httpOptions);
    }
    userDetail(json): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/userDetail', JSON.stringify(json), httpOptions);
    }
    editProfilebyRole(json): Observable<any> {
        return this.http.put<any>(environment.backendApis + 'api/user', JSON.stringify(json), httpOptions);
    }
    editPasswordAdmin(json): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/admin/newpassword', JSON.stringify(json), httpOptions);
    }
    editPasswordUser(json): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/newpassword', JSON.stringify(json), httpOptions);
    }
    deleteUser(id): Observable<any> {
        return this.http.delete<any>(environment.backendApis + `api/deleteUser/${id}`, httpOptions);
    }
    addUser(json): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/manualSignUp', JSON.stringify(json), httpOptions);
    }
    allTimeZone(): Observable<any> {
        return this.http.get<any>(environment.backendApis + 'api/allZone', httpOptions);
    }
    updateStudentType(json): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/updateStudentType', JSON.stringify(json), httpOptions);
    }
    activeOrInactiveUser(id,active): Observable<any> {
        return this.http.put<any>(environment.backendApis + `api/active/${id}?active=${active}`, httpOptions);
    }
    //for ventas 
    listSales(json): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/sell', JSON.stringify(json), httpOptions);
    }
    //for teacher
    allLanguages(): Observable<any> {
        return this.http.get<any>(environment.backendApis + 'api/allLanguages', httpOptions);
    }
    deleteFile(json): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/delete/resource',JSON.stringify(json),httpOptions);
      }
 

  
    //encode JWT
    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };



}
