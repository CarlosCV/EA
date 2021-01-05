import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment'
const httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
};

@Injectable({
    providedIn: 'root'
})

export class PaymentService {
    constructor(private http: HttpClient) { }

    createPaymentPaypal(jsonData): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/pay/createPayment', JSON.stringify(jsonData), httpHeaders);
    }
    
    createPaymentTransferencia(jsonData): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/pay/createManualPayment', JSON.stringify(jsonData), httpHeaders);
    }
    executePayment(jsonData): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/pay/executePayment', JSON.stringify(jsonData), httpHeaders);
    }
    inviteStudent(jsonData): Observable<any> {
        return this.http.post<any>(environment.backendApis + 'api/inviteStudentGuest', JSON.stringify(jsonData), httpHeaders);
    }

    /* async executePayment(data): Promise<any> {
        const response = await this.http.post(environment.backendApis + "api/pay/executePayment", JSON.stringify(data), httpHeaders).toPromise();
        return response;
    } */



}
