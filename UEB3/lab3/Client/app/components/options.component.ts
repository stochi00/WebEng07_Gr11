import {Component, OnInit} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {NgForm} from '@angular/forms';
import {Observable} from "rxjs/Observable";


@Component({
    moduleId: module.id,
    selector: 'my-options',
    templateUrl: '../views/options.html'
})
export class OptionsComponent implements OnInit {

    updateError: boolean;
    error: boolean;
    posReply: boolean;

    constructor(private http: Http) {
    };

    ngOnInit(): void {
        this.updateError = false;
    }

    public equalsPW(form: NgForm): boolean {
        if (!form || !form.value || !form.value["repeat-password"] || !form.value["new-password"]) {
            return false;
        }
        return form.value["repeat-password"] === form.value["new-password"];
    }


    /**
     * Liest das alte Passwort, das neue Passwort und dessen Wiederholung ein und übertraegt diese an die REST-Schnittstelle
     * @param form
     */
    onSubmit(form: NgForm): void {

        //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle
        if (!form) {
            return;
        }
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Authorization','Bearer '+localStorage.getItem('currentUser'));

        this.http.post("http://localhost:8081/changePassword",'oldpwd='+form.value["old-password"]+
            '&newpwd='+form.value["new-password"]+
            '&newpwd_rep='+form.value["repeat-password"],{headers: header})
            .catch(this.handleError).subscribe(
            data => {
                this.posReply = true;
                this.error = false;
            },
            error => {
                this.error = true
                this.posReply = false;
                console.log('error->'+error);
            });

        form.resetForm();

    }

    private handleError(err: any) {
        console.log(err);
        return Observable.throw(err || 'Server error');
    }

}
