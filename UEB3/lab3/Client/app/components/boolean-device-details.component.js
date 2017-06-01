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
var device_1 = require("../model/device");
var controlUnit_1 = require("../model/controlUnit");
var device_service_1 = require("../services/device.service");
var BooleanDeviceDetailsComponent = (function () {
    function BooleanDeviceDetailsComponent(deviceService) {
        this.deviceService = deviceService;
        this.log_message = null;
        this.doughnutChartData = [0, 0];
        this.doughnutChartLabels = ['Aus', 'An'];
        this.doughnutChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };
        this.doughnutChartLegend = true;
        this.doughnutChartType = 'doughnut';
    }
    BooleanDeviceDetailsComponent.prototype.ngOnInit = function () {
        this.new_value = this.controlUnit.current == 1;
    };
    //TODO Überarbeiten Sie diese Klasse. Lesen Sie die Daten für das Diagramm aus dem SessionStorage aus und passen Sie die onSubmit Funktion an.
    /**
     * Liest den neuen Wert des Steuerungselements aus und leitet diesen an die REST-Schnittstelle weiter
     */
    BooleanDeviceDetailsComponent.prototype.onSubmit = function () {
        //TODO Lesen Sie die eingebenen Daten aus und verarbeiten Sie diese über die REST-Schnittstelle
        var _this = this;
        this.doughnutChartData[this.new_value ? 1 : 0]++;
        this.doughnutChartData = Object.assign({}, this.doughnutChartData);
        if (this.log_message != null) {
            this.log_message += "\n";
        }
        else {
            this.log_message = "";
        }
        this.log_message += new Date().toLocaleString() + ": " + (this.controlUnit.current == 1 ? "An" : "Aus") + " -> " + (this.new_value ? "An" : "Aus");
        this.controlUnit.log = this.log_message;
        this.controlUnit.current = this.new_value ? 1 : 0;
        this.device.control_units[0].current = this.new_value ? 1 : 0;
        this.deviceService.updateDevice(this.device, "nothing").subscribe(function (data) {
            //this.error = false;
        }, function (error) {
            _this.log_message = "error" + error;
            console.log('error->' + error);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', device_1.Device)
    ], BooleanDeviceDetailsComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', controlUnit_1.ControlUnit)
    ], BooleanDeviceDetailsComponent.prototype, "controlUnit", void 0);
    BooleanDeviceDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'boolean-details',
            templateUrl: '../views/boolean-device-details.component.html'
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], BooleanDeviceDetailsComponent);
    return BooleanDeviceDetailsComponent;
}());
exports.BooleanDeviceDetailsComponent = BooleanDeviceDetailsComponent;
//# sourceMappingURL=boolean-device-details.component.js.map