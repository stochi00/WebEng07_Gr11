import {Component} from '@angular/core';
import {Title}     from '@angular/platform-browser';
import {DeviceService} from "../services/device.service";
import {Device} from '../model/device';
import {ActivatedRoute} from '@angular/router';
import {StatusComponent} from './status.component';
import {ControlUnit} from '../model/controlUnit';
import {ControlType} from '../model/controlType';

@Component({
    moduleId: module.id,
    selector: 'big-smart-home-app',
    templateUrl: '../views/details.html'
})
export class DetailsComponent {
    id: string;
    device: Device = null;

    controls_boolean: ControlUnit[] = null;
    controls_enum: ControlUnit[] = null;
    controls_continuous: ControlUnit[] = null;


    public constructor(private route: ActivatedRoute, private titleService: Title, deviceService: DeviceService) {
        titleService.setTitle("BIG Smart Home - Details");
        this.id = this.route.snapshot.params['id'];
        deviceService.getDevice(this.id).then(value => {
            this.device = value;
            this.controls_boolean = this.device.control_units.filter((valueb, index, array) => valueb.type == ControlType.boolean);
            this.controls_enum = this.device.control_units.filter((valuee, index, array) => valuee.type == ControlType.enum);
            this.controls_continuous = this.device.control_units.filter((valuec, index, array) => valuec.type == ControlType.continuous);
        }).catch(reason => {});



    }
}

