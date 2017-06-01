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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_module_1 = require('./app-routing.module');
var ng2_charts_1 = require('ng2-charts');
var common_1 = require('@angular/common');
var app_component_1 = require('./components/app.component');
var login_component_1 = require('./components/login.component');
var sidebar_component_1 = require('./components/sidebar.component');
var devices_component_1 = require('./components/devices.component');
var navigation_component_1 = require('./components/navigation.component');
var overview_component_1 = require('./components/overview.component');
var options_component_1 = require('./components/options.component');
var device_service_1 = require('./services/device.service');
var authentication_service_1 = require('./services/authentication.service');
var auth_guard_1 = require('./guards/auth.guard');
var device_parser_service_1 = require('./services/device-parser.service');
var device_details_component_1 = require("./components/device-details.component");
var continuous_device_details_component_1 = require("./components/continuous-device-details.component");
var enum_device_details_component_1 = require("./components/enum-device-details.component");
var boolean_device_details_component_1 = require("./components/boolean-device-details.component");
var overlay_component_1 = require("./components/overlay.component");
var websocket_service_1 = require("./services/websocket.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                app_routing_module_1.AppRoutingModule,
                ng2_charts_1.ChartsModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                sidebar_component_1.SidebarComponent,
                boolean_device_details_component_1.BooleanDeviceDetailsComponent,
                continuous_device_details_component_1.ContinuousDeviceDetailsComponent,
                enum_device_details_component_1.EnumDeviceDetailsComponent,
                devices_component_1.DevicesComponent,
                device_details_component_1.DeviceDetailsComponent,
                navigation_component_1.NavigationComponent,
                overview_component_1.OverviewComponent,
                options_component_1.OptionsComponent,
                login_component_1.LoginComponent,
                overlay_component_1.OverlayComponent,
            ],
            providers: [
                { provide: core_1.LOCALE_ID, useValue: "de-at" },
                common_1.DatePipe,
                device_service_1.DeviceService,
                authentication_service_1.AuthenticationService,
                device_parser_service_1.DeviceParserService,
                auth_guard_1.AuthGuard,
                devices_component_1.DevicesComponent,
                websocket_service_1.WebsocketService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map