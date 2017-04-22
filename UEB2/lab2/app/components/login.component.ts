import {Component} from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'big-smart-home-app',
    templateUrl: '../views/login.html'
})
export class LoginComponent {
    nav_acc_href_id = "#formheadline";

    public constructor(private titleService: Title ) {
        titleService.setTitle("BIG Smart Home - Login");
    }
}
