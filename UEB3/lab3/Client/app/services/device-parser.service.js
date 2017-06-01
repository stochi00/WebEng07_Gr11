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
var controlType_1 = require('../model/controlType');
var DeviceParserService = (function () {
    function DeviceParserService() {
        this.function_map = [{ id: "Heizkörperthermostat", value: drawThermometer }, {
                id: "Beleuchtung",
                value: drawBulb
            }, { id: "Webcam", value: drawCam }, { id: "Überwachungskamera", value: drawCam }, { id: "Rollladen", value: drawShutter }];
        this.update_map = [{ id: "Heizkörperthermostat", value: updateThermometer }, {
                id: "Beleuchtung",
                value: updateBulb
            }, { id: "Webcam", value: updateCam }, { id: "Überwachungskamera", value: updateCam }, {
                id: "Rollladen",
                value: updateShutter
            }];
    }
    DeviceParserService.prototype.parseDevice = function (dev) {
        var draw = this.function_map.filter(function (x) { return x.id === dev.type; })[0];
        var update = this.update_map.filter(function (x) { return x.id === dev.type; })[0];
        if (draw != null) {
            dev.draw_image = draw.value;
        }
        else if (dev.image != null) {
            dev.draw_image = addImage;
        }
        if (update != null) {
            dev.update_image = update.value;
        }
        for (var _i = 0, _a = dev.control_units; _i < _a.length; _i++) {
            var controlUnit = _a[_i];
            switch (controlUnit.type.toString()) {
                case "continuous":
                    controlUnit.type = controlType_1.ControlType.continuous;
                    break;
                case "enum":
                    controlUnit.type = controlType_1.ControlType.enum;
                    break;
                case "boolean":
                    controlUnit.type = controlType_1.ControlType.boolean;
                    break;
            }
        }
        return dev;
    };
    DeviceParserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DeviceParserService);
    return DeviceParserService;
}());
exports.DeviceParserService = DeviceParserService;
//# sourceMappingURL=device-parser.service.js.map