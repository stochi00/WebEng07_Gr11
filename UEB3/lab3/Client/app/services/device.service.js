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
var device_parser_service_1 = require('./device-parser.service');
require('rxjs/Rx');
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var DeviceService = (function () {
    function DeviceService(parserService, http) {
        this.parserService = parserService;
        this.http = http;
    }
    //TODO Sie können dieses Service benutzen, um alle REST-Funktionen für die Smart-Devices zu implementieren
    DeviceService.prototype.getDevices = function () {
        var _this = this;
        console.log('in getdevices...');
        /*
         * Verwenden Sie das DeviceParserService um die via REST ausgelesenen Geräte umzuwandeln.
         * Das Service ist dabei bereits vollständig implementiert und kann wie unten demonstriert eingesetzt werden.
         */
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem('currentUser'));
        /// var devices: Device[] = [];
        return this.http.post('http://localhost:8081/listDevices', 'nothing=Nothing', { headers: header })
            .toPromise()
            .then(function (response) {
            var devices = response.json();
            for (var i = 0; i < devices.length; i++) {
                devices[i] = _this.parserService.parseDevice(devices[i]);
            }
            return devices;
        })
            .catch(this.handleError);
    };
    DeviceService.prototype.getDevice = function (id) {
        console.log('in getDevice');
        return this.getDevices().then(function (devices) { return devices.find(function (device) { return device.id === id; }); });
    };
    DeviceService.prototype.removeDevice = function (id) {
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem('currentUser'));
        return this.http.post('http://localhost:8081/deleteDevice', 'id=' + id, { headers: header })
            .map(function (response) {
        }).catch(this.handleError);
    };
    DeviceService.prototype.updateDevice = function (device, values) {
        console.log('updateDevice called...');
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem('currentUser'));
        var body = 'id=' + device.id + '&name=' + device.display_name + '&controlunit=' + device.control_units[0].name + '&value=';
        if (values === "nothing")
            body += device.control_units[0].current;
        else
            body += values;
        console.log(body);
        return this.http.post('http://localhost:8081/updateDevice', body, { headers: header })
            .map(function (response) {
            console.log(response.toString());
        }).catch(this.handleError);
    };
    DeviceService.prototype.addDevice = function (device) {
        console.log("addDevice called");
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem('currentUser'));
        return this.http.post('http://localhost:8081/appendDevice', 'nothing=Nothing', { headers: header })
            .map(function (response) {
            console.log(response.toString());
        }).catch(this.handleError);
    };
    DeviceService.prototype.handleError = function (err) {
        console.log(err);
        return Observable_1.Observable.throw(err || 'Server error');
    };
    DeviceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [device_parser_service_1.DeviceParserService, http_1.Http])
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map