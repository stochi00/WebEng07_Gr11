import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {OverviewComponent} from "./overview.component";
import {DeviceService} from "../services/device.service";
import {Device} from "../model/device";
import {ControlUnit} from "../model/controlUnit";
import {ControlType} from "../model/controlType";
import {Http, Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
@Component({
  moduleId: module.id,
  selector: 'my-overlay',
  templateUrl: '../views/overlay.component.html'
})
export class OverlayComponent implements OnInit {

  @Input()
  overviewComponent: OverviewComponent = null;

  device_types: any;
  controlUnit_types: any;
  selected_type: string = null;
  controlUnitType_selected: string = null;

  addError: boolean = false;
  createError: boolean = false;

  model: any = {};
  control_units: any ={};

  constructor(private deviceService: DeviceService,private router: Router, private http: Http) {
  }


  ngOnInit(): void {
    this.device_types = ["Beleuchtung", "Heizkörperthermostat", "Rollladen", "Überwachungskamera", "Webcam"]
    this.controlUnit_types = ["Ein/Auschalter", "Diskrete Werte", "Kontinuierlicher Wert"];
    this.selected_type = this.device_types[0];
    this.controlUnitType_selected = this.controlUnit_types[0];
  }

  doClose(): void {
    if (this.overviewComponent != null) {
      this.overviewComponent.closeAddDeviceWindow();
    }
  }

  /**
   * Liest die Daten des neuen Gerätes aus der Form aus und leitet diese an die REST-Schnittstelle weiter
   * @param form
   */
  onSubmit(event: Event,form: NgForm): void {
    console.log('in on submit addDevice');
    event.preventDefault();
    form.reset();

    //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle

    let body = {
      "display_name": this.model.display_name,
      "type_name": this.model.type_name,
      "type": this.selected_type
     /* "control_units": [
        {
          "name": this.model.controlname,
          "type": this.controlUnitType_selected,
          "min": this.model.min,
          "max": this.model.max,
          "values": this.model.values,
          "primary": false
        }
      ]*/
    }

    let header = new Headers();
    header.append('Content-Type','application/json');
    header.append('Authorization','Bearer '+localStorage.getItem('currentUser'));
    console.log('in on submit addDevice 2');

    this.http.post('http://localhost:8081/addDevice',JSON.stringify(body),{headers: header})
        .map((response: Response) => {
          this.router.navigate(['/overview']);
    }).catch(this.handleError);

  }
  private handleError(err: Response | any) {
    console.log(err);
    this.addError = true;
    return Observable.throw(err || 'Server error');
  }

  isSelected(type: string): boolean {
    return type == this.device_types[0];
  }

  isBooleanSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[0];
  }

  isEnumSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[1];
  }

  isContinuousSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[2];
  }

}
