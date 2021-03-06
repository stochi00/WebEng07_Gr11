"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var params = new http_1.URLSearchParams();
        params.set('username', username);
        params.set('password', password);
        var body = params.toString();
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post('http://localhost:8081/login', body, { headers: header })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json();
            if (token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', token);
            }
        }).catch(this.handleError);
    };
    AuthenticationService.prototype.handleError = function (err) {
        console.log(err);
        return Observable_1.Observable.throw(err || 'Server error');
    };
    AuthenticationService.prototype.logout = function () {
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem('currentUser'));
        return this.http.post('http://localhost:8081/logout', 'nothing=nothing', { headers: header })
            .map(function (response) {
            localStorage.removeItem('currentUser');
        }).catch(this.handleError);
        // remove user from local storage to log user out
    };
    AuthenticationService.prototype.status = function () {
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem('currentUser'));
        return this.http.post('http://localhost:8081/status', 'nothing=Nothing', { headers: header })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map