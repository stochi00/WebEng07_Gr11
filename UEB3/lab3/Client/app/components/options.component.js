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
require('rxjs/add/operator/toPromise');
var Observable_1 = require("rxjs/Observable");
var OptionsComponent = (function () {
    function OptionsComponent(http) {
        this.http = http;
    }
    ;
    OptionsComponent.prototype.ngOnInit = function () {
        this.updateError = false;
    };
    OptionsComponent.prototype.equalsPW = function (form) {
        if (!form || !form.value || !form.value["repeat-password"] || !form.value["new-password"]) {
            return false;
        }
        return form.value["repeat-password"] === form.value["new-password"];
    };
    /**
     * Liest das alte Passwort, das neue Passwort und dessen Wiederholung ein und übertraegt diese an die REST-Schnittstelle
     * @param form
     */
    OptionsComponent.prototype.onSubmit = function (form) {
        var _this = this;
        //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle
        if (!form) {
            return;
        }
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem('currentUser'));
        this.http.post("http://localhost:8081/changePassword", 'oldpwd=' + form.value["old-password"] +
            '&newpwd=' + form.value["new-password"] +
            '&newpwd_rep=' + form.value["repeat-password"], { headers: header })
            .catch(this.handleError).subscribe(function (data) {
            _this.posReply = true;
            _this.error = false;
        }, function (error) {
            _this.error = true;
            _this.posReply = false;
            console.log('error->' + error);
        });
        form.resetForm();
    };
    OptionsComponent.prototype.handleError = function (err) {
        console.log(err);
        return Observable_1.Observable.throw(err || 'Server error');
    };
    OptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-options',
            templateUrl: '../views/options.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OptionsComponent);
    return OptionsComponent;
}());
exports.OptionsComponent = OptionsComponent;
//# sourceMappingURL=options.component.js.map