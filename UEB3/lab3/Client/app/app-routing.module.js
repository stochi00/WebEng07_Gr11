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
var overview_component_1 = require('./components/overview.component');
var login_component_1 = require('./components/login.component');
var options_component_1 = require('./components/options.component');
var device_details_component_1 = require("./components/device-details.component");
var auth_guard_1 = require("./guards/auth.guard");
//TODO Setzen Sie Angular Guards ein um einen unbefugten Zugriff zu verhindern
var routes = [
    { path: '', component: login_component_1.LoginComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'overview', component: overview_component_1.OverviewComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'options', component: options_component_1.OptionsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'details/:id', component: device_details_component_1.DeviceDetailsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map