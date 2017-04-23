import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit, AfterViewChecked} from '@angular/core';
import {Device} from '../model/device';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: '[device-component]',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: '../views/device.html',
})

export class DeviceComponent implements AfterViewInit  {
    @Input() device: Device;
    @Output() deviceRemoved = new EventEmitter();

    public isEditable: boolean = false;
    public temp_name: string;

    ngAfterViewInit() {
        //function drawThermometer(id, src, min, max, current, values) {
        this.device.draw_image(this.device.id,
            this.device.image,
            this.device.control_units[0].min,
            this.device.control_units[0].max,
            this.device.control_units[0].current,
            this.device.control_units[0].values);
        //$('#svgintro').svg({onLoad: drawIntro});
    }

    constructor(private router: Router) {
        //draw_image(id, src, min, max, current, values)

    }

    public removeItem() {
        if (!this.isEditable)
            this.deviceRemoved.emit(this.device);
        this.toggleEdit(false);
    }

    public editItem(value: string) {
        this.temp_name = value;
    }

    public handleClick(event: any) {
        var clickedComponent = event.target;

        if (clickedComponent.nodeName == "INPUT") {
            return;
        }

        if (clickedComponent.className == "device-edit") {
            return;
        }
        
        this.isEditable = false;
    }

    public toggleEdit(save: boolean) {
        if (save)
            this.device.display_name = this.temp_name;
        else
            this.temp_name = this.device.display_name;
        this.isEditable = !this.isEditable;
    }

    public clickedElement() {
        if (!this.isEditable)
            this.router.navigate(['/details', this.device.id]);
    }
}
