import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

     constructor(public location: Location, public router: Router, public authService: AuthService) {}

    ngOnInit(){
        let token = this.authService.loadToken();
        if(token) {
            console.log('current user is:', this.authService.getCurrentUser())
            this.router.navigateByUrl('dashboard');}
    }

    isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
        return false;
      }
      else {
        return true;
      }
    }
}
