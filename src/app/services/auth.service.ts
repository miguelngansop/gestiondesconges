import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private host: string = 'http://127.0.0.1:8080/login';
    private hostUsers: string = 'http://127.0.0.1:8080/users/getByUserName/';
    private jwtToken: string;
    private roles: Array<any>;
    private  currentUser: any;


  constructor( public httpClient: HttpClient) { }

  getCurrentUser() {
      this.currentUser = localStorage.getItem('currentUser');
      return this.currentUser;
  }
  setCurrentUser(user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user))
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
      let jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }

  login(username, password) {
    return   this.httpClient.post(this.host, {'username': username, 'password': password}, { observe: 'response'} )
  }

  saveToken(jwt: any) {
      this.jwtToken = jwt;
      localStorage.setItem('token', jwt);
      const jwtHelper = new JwtHelperService;
      console.log('token decode:', jwtHelper.decodeToken(this.jwtToken));
      this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }

  isEmploye(): Boolean {
      var resp = false;
      if (this.roles.includes('Employe') ) {
          resp = true;
      }
      return  resp;
  }
    loadToken() {
      this.jwtToken = localStorage.getItem('token');
      return this.jwtToken;
  }

  logOut() {
      localStorage.removeItem('token');
  }
  getCurrentUserForremote(username: string) {
      return this.httpClient.get(this.hostUsers  + username);
  }
}
