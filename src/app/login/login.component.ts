import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private router: Router,
        private authService: AuthService,
        private notifierService: NotifierService
    ) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl(''),
        });
    }

    onLogin() {
        this.authService.logIn(this.loginForm.value).subscribe((res: any) => {
            if (res.access_token) {
                this.authService.setToken(res.access_token);
                this.authService.setRole(res.role);
                this.router.navigate(['/']);
            }
        }, e => {
            if (e.error.status === 401) {
                this.notifierService.notify('error', 'Invalid username or password. Please try again.');
            } else {
                this.notifierService.notify('error', 'Something went wrong');
            }
        });
    }
}
