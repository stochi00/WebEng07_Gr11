import {Component} from '@angular/core';
import {Title}     from '@angular/platform-browser';
import {DeviceService} from "../services/device.service";
import {Device} from '../model/device';
import {ActivatedRoute} from '@angular/router';
import {StatusComponent} from './status.component';

@Component({
    moduleId: module.id,
    selector: 'big-smart-home-app',
    templateUrl: '../views/details.html'
})
export class DetailsComponent {
    nav_acc_href_id = "#deviceheadline";
    id: string;
    device: Device = null;

    public constructor(private route: ActivatedRoute, private titleService: Title, deviceService: DeviceService) {
        titleService.setTitle("BIG Smart Home - Details");
        this.id = this.route.snapshot.params['id'];
        deviceService.getDevice(this.id).then(value => this.device = value).catch(reason => {});
    }
}
