import {Device} from '../model/device';
import {Injectable} from '@angular/core';

import {DEVICES} from '../resources/mock-device';
import {DeviceParserService} from './device-parser.service';

import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {Http, Headers,Response} from "@angular/http";
import {RequestArgs} from "@angular/http/src/interfaces";


@Injectable()
export class DeviceService {

    constructor(private parserService: DeviceParserService,private http: Http) {
    }

    //TODO Sie können dieses Service benutzen, um alle REST-Funktionen für die Smart-Devices zu implementieren

    getDevices(): Promise<Device[]> {
        console.log('in getdevices...');
        /*
         * Verwenden Sie das DeviceParserService um die via REST ausgelesenen Geräte umzuwandeln.
         * Das Service ist dabei bereits vollständig implementiert und kann wie unten demonstriert eingesetzt werden.
         */
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem('currentUser'));

       /// var devices: Device[] = [];
        return this.http.post('http://localhost:8081/listDevices', 'nothing=Nothing', {headers: header})
            .toPromise()
            .then(response => {
                 let devices = response.json();
                for (let i = 0; i < devices.length; i++) {
                    devices[i] = this.parserService.parseDevice(devices[i]);
                    //console.log(devices[i]);
                }
                return devices;
            })
            .catch(this.handleError);
    }

    getDevice(id: string): Promise<Device> {
        console.log('in getDevice');
        return this.getDevices().then(devices => devices.find(device => device.id === id));
    }



    removeDevice(id: string) {
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        header.append('Authorization','Bearer '+localStorage.getItem('currentUser'));

        return this.http.post('http://localhost:8081/deleteDevice','id='+id,{headers: header})
            .map((response: Response) => {

            }).catch(this.handleError);
    }

    updateDevice(device: Device,values: string) {
        console.log('updateDevice called...');
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        header.append('Authorization','Bearer '+localStorage.getItem('currentUser'));

        var body = 'id='+device.id+'&name='+device.display_name+'&controlunit='+device.control_units[0].name+'&value=';

        if(values === "nothing")
            body += device.control_units[0].current;
        else
            body += values;

        console.log(body);
        return this.http.post('http://localhost:8081/updateDevice',body,{headers: header})
            .map((response: Response) => {
                console.log(response.toString());
            }).catch(this.handleError);
    }

    addDevice(device: Device){
        console.log("addDevice called");

        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        header.append('Authorization','Bearer '+localStorage.getItem('currentUser'));

        return this.http.post('http://localhost:8081/appendDevice','nothing=Nothing',{headers: header})
            .map((response: Response) => {
                console.log(response.toString());
            }).catch(this.handleError);
    }

    private handleError(err: Response | any) {
        console.log(err);
        return Observable.throw(err || 'Server error');
    }

}
