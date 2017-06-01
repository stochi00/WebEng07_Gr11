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
var device_service_1 = require("../services/device.service");
require('rxjs/add/operator/map');
var DevicesComponent = (function () {
    function DevicesComponent(deviceService) {
        this.deviceService = deviceService;
        this.devices = [];
        this.update = true;
        this.device_num = 0;
        this.error = false;
    }
    DevicesComponent.prototype.ngOnInit = function () {
        this.update = true;
        this.listDevices();
    };
    DevicesComponent.prototype.ngAfterViewChecked = function () {
        if (this.devices != null && this.device_num != this.devices.length && this.device_num < this.devices.length) {
            this.update = true;
            this.device_num = this.devices.length;
        }
        if (this.devices != null && this.device_num > this.devices.length) {
            this.device_num = this.devices.length;
        }
        if (this.devices == null || !this.update) {
            return;
        }
        this.update = false;
        for (var _i = 0, _a = this.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            console.log(device.image);
            if (device.draw_image == null) {
                continue;
            }
            for (var _b = 0, _c = device.control_units; _b < _c.length; _b++) {
                var control_unit = _c[_b];
                if (control_unit.primary) {
                    device.draw_image(device.id, device.image, control_unit.min, control_unit.max, control_unit.current, control_unit.values);
                }
            }
        }
    };
    /**
     * Liest alle Geräte aus und initialisiert ein Flag zum Editierungs-Status dieses Gerätes
     */
    DevicesComponent.prototype.listDevices = function () {
        var _this = this;
        console.log("in list devices");
        this.deviceService.getDevices().then(function (devices) {
            _this.devices = devices;
            _this.edit = new Array(_this.devices.length);
            for (var i = 0; i < _this.devices.length; i++) {
                _this.edit[i] = { id: _this.devices[i].id, value: false };
            }
            _this.device_num = devices.length;
            _this.update = true;
        });
    };
    /**
     * Liest aus ob ein Gerät derzeit bearbeitet wird
     * @param device
     * @returns {boolean}
     */
    DevicesComponent.prototype.isEdited = function (device) {
        var index = this.findStatus(device);
        if (index < 0) {
            return false;
        }
        return this.edit[index].value;
    };
    /**
     * Liefert den index des gewünschten Gerätes innerhalb des Arrays für den Editierungs-Status zurück
     * @param device
     * @returns {number}
     */
    DevicesComponent.prototype.findStatus = function (device) {
        for (var i = 0; i < this.edit.length; i++) {
            if (device.id === this.edit[i].id) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Ersetzt das Geräte-Label durch ein Input-Field und ermöglicht so ein Ändern des Anzeigenamens
     * @param device
     */
    DevicesComponent.prototype.editDevice = function (device) {
        var index = this.findStatus(device);
        if (index >= 0) {
            this.edit[index].value = true;
        }
        var device_outer = $(".device-outer[data-device-id=" + device.id + "]");
        var edit = device_outer.find(".device-edit");
        edit.hide();
        var remove = device_outer.find(".device-remove");
        remove.attr("src", "../images/ok.png");
    };
    /**
     * Speichert die Änderungen welche am Gerät durchgeführt wurden
     * @param device
     */
    DevicesComponent.prototype.finishEdit = function (device) {
        var _this = this;
        this.showLabel(device);
        //TODO Lesen Sie den geänderten Anzeigenamen aus und speichern Sie diesen über die REST-Schnittstelle
        this.deviceService.updateDevice(device, "nothing").subscribe(function (data) {
            _this.error = false;
        }, function (error) {
            _this.error = true;
        });
    };
    /**
     * Entfernt das angegebene Gerät
     * @param device
     */
    DevicesComponent.prototype.removeDevice = function (device) {
        var _this = this;
        console.log('in remove Device component ....id =>' + device.id);
        this.deviceService.removeDevice(device.id).subscribe(function (data) {
            _this.error = false;
            _this.listDevices();
        }, function (error) {
            _this.error = true;
        });
    };
    /**
     * Setz das Input-Feld wieder auf ein Label zurück und beendet so das Bearbeiten
     * @param device
     */
    DevicesComponent.prototype.showLabel = function (device) {
        var index = this.findStatus(device);
        if (index >= 0) {
            this.edit[index].value = false;
        }
        var device_outer = $(".device-outer[data-device-id=" + device.id + "]");
        var edit = device_outer.find(".device-edit");
        edit.show();
        var remove = device_outer.find(".device-remove");
        remove.attr("src", "../images/remove.png");
    };
    DevicesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-devices',
            templateUrl: '../views/devices.component.html'
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], DevicesComponent);
    return DevicesComponent;
}());
exports.DevicesComponent = DevicesComponent;
//# sourceMappingURL=devices.component.js.map