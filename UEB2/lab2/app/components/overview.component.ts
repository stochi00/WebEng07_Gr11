import {Component} from '@angular/core';
import {Title}     from '@angular/platform-browser';
import {DeviceService} from "../services/device.service";
import {Device} from "../model/device";
import {StatusComponent} from './status.component';

@Component({
    moduleId: module.id,
    selector: 'big-smart-home-app',
    templateUrl: '../views/overview.html'
})

export class OverviewComponent{
    nav_acc_href_id = "#devicesheadline";
    devices: Device[] = null;

    public constructor(private titleService: Title, deviceService: DeviceService) {
        titleService.setTitle("BIG Smart Home - Geräte");
        deviceService.getDevices().then(value => this.devices = value).catch(reason => {});
    }

    handleDeviceRemoved(device: Device)
    {
        let index: number = this.devices.indexOf(device);
        if (index !== -1) {
            this.devices.splice(index, 1);
        }
        this.devices.slice()
    }
}
