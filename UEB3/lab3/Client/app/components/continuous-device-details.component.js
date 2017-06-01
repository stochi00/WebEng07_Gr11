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
var ContinuousDeviceDetailsComponent = (function () {
    function ContinuousDeviceDetailsComponent(deviceService) {
        this.deviceService = deviceService;
        this.lineChartData = [
            { data: [], label: 'Verlauf' }
        ];
        this.lineChartLabels = [];
        this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    ;
    ContinuousDeviceDetailsComponent.prototype.ngOnInit = function () {
        this.new_value = this.controlUnit.current;
    };
    //TODO Überarbeiten Sie diese Klasse. Lesen Sie die Daten für das Diagramm aus dem SessionStorage aus und passen Sie die onSubmit Funktion an.
    /**
     * Liest den neuen Wert des Steuerungselements aus und leitet diesen an die REST-Schnittstelle weiter
     */
    ContinuousDeviceDetailsComponent.prototype.onSubmit = function () {
        //TODO Lesen Sie die eingebenen Daten aus und verarbeiten Sie diese über die REST-Schnittstelle
        var _this = this;
        var time = new Date();
        var _lineChartData = Object.assign({}, this.lineChartData);
        _lineChartData[0].data.push(this.new_value);
        this.lineChartLabels.push(time.toLocaleDateString() + " " + time.toLocaleTimeString());
        this.lineChartData = _lineChartData;
        if (this.log_message != null) {
            this.log_message += "\n";
        }
        else {
            this.log_message = "";
        }
        this.log_message += new Date().toLocaleString() + ": " + this.controlUnit.current + " -> " + this.new_value;
        this.controlUnit.log = this.log_message;
        this.controlUnit.current = this.new_value;
        this.device.control_units[0].current = this.new_value;
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
    ], ContinuousDeviceDetailsComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', controlUnit_1.ControlUnit)
    ], ContinuousDeviceDetailsComponent.prototype, "controlUnit", void 0);
    ContinuousDeviceDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'continuous-details',
            templateUrl: '../views/continuous-device-details.component.html'
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], ContinuousDeviceDetailsComponent);
    return ContinuousDeviceDetailsComponent;
}());
exports.ContinuousDeviceDetailsComponent = ContinuousDeviceDetailsComponent;
//# sourceMappingURL=continuous-device-details.component.js.map