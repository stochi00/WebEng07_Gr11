import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import {AlertService} from "../services/alert.service";


@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: '../views/login.html'
})
export class LoginComponent implements OnInit{
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }



    onSubmit(form: NgForm): void {
        //TODO Überprüfen Sie die Login-Daten über die REST-Schnittstelle und leiten Sie den Benutzer bei Erfolg auf die Overview-Seite weiter
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(['/overview']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }

}
