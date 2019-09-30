import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor( public authService: AuthService, public router: Router) { }


  submit() {
    if (this.form.valid) {
      console.log(this.form.value)
        this.authService.login(this.form.value.username, this.form.value.password).subscribe((e: any)=>{
          console.log(e);
          let token = e.headers.get('authorization');
          this.authService.saveToken(token);
          this.authService.getCurrentUserForremote(this.form.value.username).subscribe((p:any)=>{
            this.authService.setCurrentUser(p);
          }, err => {
            console.log('erreur lors de la lecture du current user');
          })
          this.router.navigateByUrl("dashboard");

        }, err => {
          Swal.fire(
              'Echec',
              'Mot de passe ou nom de connexion incorrect',
             'warning'
          );
        })
      this.submitEM.emit(this.form.value);
    }
  }


  ngOnInit() {
  }

}
