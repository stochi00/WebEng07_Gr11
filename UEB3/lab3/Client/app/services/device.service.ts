import {Device} from '../model/device';
import {Injectable} from '@angular/core';

//import {DEVICES} from '../resources/mock-device';
import {DeviceParserService} from './device-parser.service';

import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import {Http, Headers,Response} from "@angular/http";


@Injectable()
export class DeviceService {

    constructor(private parserService: DeviceParserService,private http: Http) {
    }

    //TODO Sie können dieses Service benutzen, um alle REST-Funktionen für die Smart-Devices zu implementieren

    getDevices(): Promise<Device[]> {
        /*
         * Verwenden Sie das DeviceParserService um die via REST ausgelesenen Geräte umzuwandeln.
         * Das Service ist dabei bereits vollständig implementiert und kann wie unten demonstriert eingesetzt werden.
         */
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        header.append('Authorization','Bearer '+localStorage.getItem('currentUser'));


        var devices: Device[];
        this.http.post('http://localhost:8081/listDevices','nothing=nothing',{headers: header})
            .map((response: Response) => {
                devices = response.json();
                console.log(devices);
            }).catch(this.handleError);
        //TODO -> bitte json object (devices) zum Promise Object umwandeln
        return Promise.all(devices);
        /*Promise.resolve(devices).then(devices => {
            for (let i = 0; i < devices.length; i++) {
                devices[i] = this.parserService.parseDevice(devices[i]);
            }
            return devices;
        });*/
    }

    getDevice(id: string): Promise<Device> {
        return this.getDevices()
            .then(devices => devices.find(device => device.id === id));
    }

    handleError(err: Response | any) {
        console.log(err);
        return Observable.throw(err || 'Server error');
    }

    removeDevice(id: string) {
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        header.append('Authorization','Bearer '+localStorage.getItem('currentUser'));



        return this.http.post('http://localhost:8081/deleteDevice','id='+id,{headers: header})
            .map((response: Response) => {

            }).catch(this.handleError);
    }

    updateDevice(id: string,name:string,value:string) {
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        header.append('Authorization','Bearer '+localStorage.getItem('currentUser'));



        return this.http.post('http://localhost:8081/updateDevice','id='+id+'&name='+name+'&value='+value,{headers: header})
            .map((response: Response) => {

            }).catch(this.handleError);
    }




}
