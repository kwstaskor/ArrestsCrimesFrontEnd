import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../User';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  isLoginError: boolean = false;
  playLoader!:boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }
  
  token!:string
  onSubmit(userName: any, password: any) {
  this.playLoader = true;
   let user = <User>{};
   user.Email = userName;
   user.Password = password;
    this.authService.userLogin(user).subscribe((data: any) => {
      this.token = data.token
      if(this.token){
        this.playLoader = false;
        localStorage.setItem('userToken', this.token);
            this.router.navigate(['/Arrests'])
            .then(() => {
              window.location.reload();
            });
      }
    }, (err: HttpErrorResponse) => {
      this.playLoader = false;
      this.isLoginError = true;
    });
  }
}