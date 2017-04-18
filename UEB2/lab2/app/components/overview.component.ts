import {Component} from '@angular/core';
import {Title}     from '@angular/platform-browser';
import {DeviceService} from "../services/device.service";
import {Device} from "../model/device";
import {DEVICES} from "../resources/mock-devices";
import {DeviceComponent} from "./device.component";

@Component({
    moduleId: module.id,
    selector: 'big-smart-home-app',
    templateUrl: '../views/overview.html'
})



export class OverviewComponent {

    devices: Device[] = DEVICES;

    public constructor(private titleService: Title, deviceService: DeviceService) {
        titleService.setTitle("BIG Smart Home - Geräte");
        //deviceService.getDevices().then(value => this.devices);
    }
}
