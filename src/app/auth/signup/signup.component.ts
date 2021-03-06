import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
  });

  playLoader!:boolean;
  isLoginError: boolean = false;
  registerErrorEmail!:string;
  registerErrorConfirmPassword!:string;
  registerErrorErrormessages!:string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  token!:string
  onSubmit(userName: any, password: any, confirmPaswword:any) {
  this.playLoader = true;
   let user = <User>{};
   user.Email = userName;
   user.Password = password;
   user.ConfirmPassword = confirmPaswword;
    this.authService.userRegister(user).subscribe((data: any) => {
      this.token = data.token
      if(this.token){
        localStorage.setItem('userToken', this.token);
        this.playLoader = false;
            this.router.navigate(['/Arrests'])
            .then(() => {
              window.location.reload();
            });
      }
    }, (err) => {
      this.playLoader = false;
      this.isLoginError = true;
      this.registerErrorEmail = err.error.errors?.Email;
      this.registerErrorConfirmPassword = err.error.errors?.ConfirmPassword;
      this.registerErrorErrormessages = err.error.errorMessages;
      if(!this.registerErrorEmail && !this.registerErrorConfirmPassword && ! this.registerErrorErrormessages)
      this.registerErrorErrormessages = err.statusText;
    });
  }

}
