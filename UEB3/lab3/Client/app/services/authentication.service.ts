import { Injectable } from '@angular/core';
import { Http,  RequestOptions, URLSearchParams , Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('username', username);
        params.set('password', password);
        let body = params.toString();

        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');



        return this.http.post('http://localhost:8081/login',body,{headers: header})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json();

                if (token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', token);
                }
            }).catch(this.handleError);



    }
    private handleError(err: Response | any) {
        console.log(err);
        return Observable.throw(err || 'Server error');
    }

    logout() {
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        header.append('Authorization','Bearer '+localStorage.getItem('currentUser'));



        return this.http.post('http://localhost:8081/logout','nothing=nothing',{headers: header})
            .map((response: Response) => {
                localStorage.removeItem('currentUser');
            }).catch(this.handleError);
        // remove user from local storage to log user out


    }
}