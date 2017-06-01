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
var router_1 = require('@angular/router');
var options_component_1 = require("./options.component");
var login_component_1 = require("./login.component");
var authentication_service_1 = require("../services/authentication.service");
var NavigationComponent = (function () {
    function NavigationComponent(router, route, authenticationService) {
        this.router = router;
        this.route = route;
        this.authenticationService = authenticationService;
    }
    ;
    NavigationComponent.prototype.isOptionsShown = function () {
        return !this.isOptionsite() && !this.isLoginSite();
    };
    NavigationComponent.prototype.isLogoutShown = function () {
        return !this.isLoginSite();
    };
    NavigationComponent.prototype.isOptionsite = function () {
        return this.route.component === options_component_1.OptionsComponent;
    };
    NavigationComponent.prototype.isLoginSite = function () {
        return this.route.component === login_component_1.LoginComponent;
    };
    NavigationComponent.prototype.doLogout = function () {
        var _this = this;
        //TODO Loggen Sie den Benutzer über die REST-Schnittstelle aus
        this.authenticationService.logout()
            .subscribe(function (data) {
            _this.router.navigate(['/login']);
        }, function (error) {
            // this.E = true;
        });
        //this.router.navigate(["/login"]);
    };
    NavigationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-navigation',
            templateUrl: '../views/navigation.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, authentication_service_1.AuthenticationService])
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map