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
var overview_component_1 = require("./overview.component");
var device_service_1 = require("../services/device.service");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var router_1 = require("@angular/router");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var devices_component_1 = require("./devices.component");
var OverlayComponent = (function () {
    function OverlayComponent(deviceService, router, http, devicesComponent) {
        this.deviceService = deviceService;
        this.router = router;
        this.http = http;
        this.devicesComponent = devicesComponent;
        this.overviewComponent = null;
        this.selected_type = null;
        this.controlUnitType_selected = null;
        this.addError = false;
        this.createError = false;
        this.model = {};
        this.control_units = {};
    }
    OverlayComponent.prototype.ngOnInit = function () {
        this.device_types = ["Beleuchtung", "Heizkörperthermostat", "Rollladen", "Überwachungskamera", "Webcam"];
        this.controlUnit_types = ["Ein/Auschalter", "Diskrete Werte", "Kontinuierlicher Wert"];
        this.selected_type = this.device_types[0];
        this.controlUnitType_selected = this.controlUnit_types[0];
    };
    OverlayComponent.prototype.doClose = function () {
        if (this.overviewComponent != null) {
            this.overviewComponent.closeAddDeviceWindow();
        }
        if (this.devicesComponent != null) {
            this.devicesComponent.listDevices();
        }
    };
    /**
     * Liest die Daten des neuen Gerätes aus der Form aus und leitet diese an die REST-Schnittstelle weiter
     * @param form
     */
    OverlayComponent.prototype.onSubmit = function (event, form) {
        var _this = this;
        console.log('in on submit addDevice');
        event.preventDefault();
        //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle
        console.log("selected_type->" + this.selected_type);
        var body = {
            "display_name": this.model.display_name,
            "type_name": this.model.type_name,
            "type": this.selected_type,
            "control_units": [
                {
                    "name": this.model.controlname,
                    "type": this.controlUnitType_selected,
                    "min": this.model.min,
                    "max": this.model.max,
                    "values": this.model.values,
                    "primary": false
                }
            ]
        };
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem('currentUser'));
        console.log('in on submit addDevice 2-> ' + JSON.stringify(body));
        this.http.post('http://localhost:8081/appendDevice', JSON.stringify(body), { headers: header })
            .map(function (response) {
            _this.router.navigate(['/overview']);
        }).catch(this.handleError).subscribe(function (data) {
            _this.addError = false;
            location.reload();
        }, function (error) {
            _this.addError = true;
            console.log('error->' + error);
        });
        ;
        form.reset();
        this.overviewComponent.closeAddDeviceWindow();
        this.devicesComponent.listDevices();
    };
    OverlayComponent.prototype.handleError = function (err) {
        console.log(err);
        this.addError = true;
        return Observable_1.Observable.throw(err || 'Server error');
    };
    OverlayComponent.prototype.isSelected = function (type) {
        return type == this.device_types[0];
    };
    OverlayComponent.prototype.isBooleanSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[0];
    };
    OverlayComponent.prototype.isEnumSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[1];
    };
    OverlayComponent.prototype.isContinuousSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[2];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', overview_component_1.OverviewComponent)
    ], OverlayComponent.prototype, "overviewComponent", void 0);
    OverlayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-overlay',
            templateUrl: '../views/overlay.component.html'
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService, router_1.Router, http_1.Http, devices_component_1.DevicesComponent])
    ], OverlayComponent);
    return OverlayComponent;
}());
exports.OverlayComponent = OverlayComponent;
//# sourceMappingURL=overlay.component.js.map