import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {DeviceService} from "../services/device.service";
import {Device} from "../model/device";
import 'rxjs/add/operator/map';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'my-devices',
    templateUrl: '../views/devices.component.html'
})
export class DevicesComponent implements OnInit, AfterViewChecked {

    devices: Device[] = [];
    update: boolean = true;
    edit: { id: string, value: boolean }[];

    device_num: number = 0;

    error = false;

    constructor(private deviceService: DeviceService) {
    }

    ngOnInit(): void {
        this.update = true;
        this.listDevices();
    }


    ngAfterViewChecked(): void {

        if (this.devices != null && this.device_num != this.devices.length && this.device_num < this.devices.length) {
            this.update = true;
            this.device_num = this.devices.length
        }

        if (this.devices != null && this.device_num > this.devices.length) {
            this.device_num = this.devices.length;
        }

        if (this.devices == null || !this.update) {
            return;
        }

        this.update = false;
        for (let device of this.devices) {
            console.log(device.image);
            if (device.draw_image == null) {
                continue;
            }
            for (let control_unit of device.control_units) {
                if (control_unit.primary) {
                    device.draw_image(device.id, device.image, control_unit.min, control_unit.max, control_unit.current, control_unit.values);
                }
            }
        }
    }


    /**
     * Liest alle Geräte aus und initialisiert ein Flag zum Editierungs-Status dieses Gerätes
     */
    listDevices() {
        console.log("in list devices");
        this.deviceService.getDevices().then(devices => {
            this.devices = devices;
           this.edit = new Array(this.devices.length);
            for (let i = 0; i < this.devices.length; i++) {
                this.edit[i] = {id: this.devices[i].id, value: false};
            }
            this.device_num = devices.length;
            this.update = true;
        });
    }

    /**
     * Liest aus ob ein Gerät derzeit bearbeitet wird
     * @param device
     * @returns {boolean}
     */
    isEdited(device: Device): boolean {
        let index = this.findStatus(device);
        if (index < 0) {
            return false;
        }
        return this.edit[index].value;
    }

    /**
     * Liefert den index des gewünschten Gerätes innerhalb des Arrays für den Editierungs-Status zurück
     * @param device
     * @returns {number}
     */
    findStatus(device: Device): number {
        for (let i = 0; i < this.edit.length; i++) {
            if (device.id === this.edit[i].id) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Ersetzt das Geräte-Label durch ein Input-Field und ermöglicht so ein Ändern des Anzeigenamens
     * @param device
     */
    editDevice(device: Device): void {

        let index = this.findStatus(device);
        if (index >= 0) {
            this.edit[index].value = true;
        }

        var device_outer = $(".device-outer[data-device-id=" + device.id + "]");

        var edit = device_outer.find(".device-edit");
        edit.hide();

        var remove = device_outer.find(".device-remove");
        remove.attr("src", "../images/ok.png");

    }

    /**
     * Speichert die Änderungen welche am Gerät durchgeführt wurden
     * @param device
     */
    finishEdit(device: Device): void {
        this.showLabel(device);
        //TODO Lesen Sie den geänderten Anzeigenamen aus und speichern Sie diesen über die REST-Schnittstelle
        this.deviceService.updateDevice(device,"nothing").subscribe(
            data => {

                this.error = false;
            },
            error => {
                this.error = true;
            });
    }

    /**
     * Entfernt das angegebene Gerät
     * @param device
     */
    removeDevice(device: Device): void {
        console.log('in remove Device component ....id =>'+device.id);

        this.deviceService.removeDevice(device.id).subscribe(
            data => {

                this.error = false;
                this.listDevices();
            },
            error => {
                this.error = true;
            });



    }

    /**
     * Setz das Input-Feld wieder auf ein Label zurück und beendet so das Bearbeiten
     * @param device
     */
    showLabel(device: Device): void {

        let index = this.findStatus(device);
        if (index >= 0) {
            this.edit[index].value = false;
        }

        var device_outer = $(".device-outer[data-device-id=" + device.id + "]");

        var edit = device_outer.find(".device-edit");
        edit.show();

        var remove = device_outer.find(".device-remove");
        remove.attr("src", "../images/remove.png");
    }




}
