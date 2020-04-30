import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';

interface TokenObj {
  auth_token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {


  authForm = new FormGroup({
    email: new FormControl('admin1@localhost.com'),
    password: new FormControl('sifrasifra123'),
    display_name: new FormControl('')
  });

  registerMode = false;
  logedInUser = null;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    const AuthToken = this.cookieService.get('AuthToken');
    if (AuthToken) {
      this.router.navigate(['/hotels']);
    }
  }
  saveForm() {
    if (!this.registerMode) {
      this.loginUser();
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe(
        result => {
          this.loginUser()
        });
    }
  }

  loginUser() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        this.cookieService.set('AuthToken', result.auth_token);
        this.router.navigate(['/hotels']);
      });
  }



}
