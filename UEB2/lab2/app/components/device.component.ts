import {Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import {Device} from '../model/device';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: '[device-component]',
    templateUrl: '../views/device.html',
})

export class DeviceComponent {
    @Input() device: Device;
    @Output() deviceRemoved = new EventEmitter();

    public isEditable: boolean = false;
    public temp_name:  string;

    constructor(private router: Router) { }

    public removeItem()
    {
        if(!this.isEditable)
            this.deviceRemoved.emit(this.device);
        this.toggleEdit(false);
    }

    public editItem(value: string)
    {
        this.temp_name = value;
    }

    public toggleEdit(save: boolean)
    {
        if(save)
            this.device.display_name = this.temp_name;
        else
            this.temp_name = this.device.display_name;
        this.isEditable = !this.isEditable;
    }

    public clickedElement(){
        if(!this.isEditable)
            this.router.navigate(['/details', this.device.id]);
            /*this.toggleEdit(false);
        else
            this.router.navigate(['/details', this.device.id]);
            */
    }

}
