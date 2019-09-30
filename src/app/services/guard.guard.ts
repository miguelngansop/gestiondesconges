import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate{

  constructor(private authService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean > | Promise<boolean > | boolean  {
    if (! this.authService.isAuthenticated() ) {
      this.router.navigateByUrl('login');
      return false;
    } else {
      return  true;
    }
  }

  
}
