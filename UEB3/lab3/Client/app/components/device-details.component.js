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
require('rxjs/add/operator/switchMap');
var core_1 = require("@angular/core");
var device_service_1 = require("../services/device.service");
var router_1 = require("@angular/router");
var controlType_1 = require('../model/controlType');
var DeviceDetailsComponent = (function () {
    function DeviceDetailsComponent(deviceService, route) {
        this.deviceService = deviceService;
        this.route = route;
    }
    DeviceDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.deviceService.getDevice(params['id']); })
            .subscribe(function (device) { return _this.device = device; });
    };
    DeviceDetailsComponent.prototype.isEnum = function (controlUnit) {
        return controlUnit.type === controlType_1.ControlType.enum;
    };
    DeviceDetailsComponent.prototype.isContinuous = function (controlUnit) {
        return controlUnit.type === controlType_1.ControlType.continuous;
    };
    DeviceDetailsComponent.prototype.isBoolean = function (controlUnit) {
        return controlUnit.type === controlType_1.ControlType.boolean;
    };
    DeviceDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-device-detail',
            templateUrl: '../views/details.html'
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService, router_1.ActivatedRoute])
    ], DeviceDetailsComponent);
    return DeviceDetailsComponent;
}());
exports.DeviceDetailsComponent = DeviceDetailsComponent;
//# sourceMappingURL=device-details.component.js.map