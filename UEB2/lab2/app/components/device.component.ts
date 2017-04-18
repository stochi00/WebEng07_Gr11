import {Component, Input} from '@angular/core';
import {Device} from '../model/device';

@Component({
    moduleId: module.id,
    selector: 'device-component',
    templateUrl: '../views/device.html',
    inputs: ['device']
})

export class DeviceComponent {
    public device: Device;
}
