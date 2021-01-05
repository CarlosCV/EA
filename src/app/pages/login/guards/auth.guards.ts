import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GeneralService } from '../../../services/general.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    accessToken: any
    constructor(private router: Router, private generalService: GeneralService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('access_Token')) {
            this.accessToken = this.generalService.parseJwt(sessionStorage.getItem('access_Token'));
        }
        //roles
        if (this.accessToken) {
            if (route.data.roles && route.data.roles.indexOf(this.accessToken.authorities[0]) === -1) {
                let path;
                if (sessionStorage.getItem("path")) {
                    let pathJson = JSON.parse(sessionStorage.getItem("path"))
                    pathJson.forEach(element => {
                        path = element.url
                    });
                    this.router.navigate([path]);
                }else{
                    this.router.navigate(["/"]);
                }
                
                return false;
            }
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
