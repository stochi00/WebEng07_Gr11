import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Device} from "../model/device";
import {ControlUnit} from "../model/controlUnit";
import {DeviceService} from "../services/device.service";
import {Subject} from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'continuous-details',
  templateUrl: '../views/continuous-device-details.component.html'
})
export class ContinuousDeviceDetailsComponent implements OnInit {
  @Input()
  device: Device;

  @Input()
  controlUnit: ControlUnit;

  constructor(private deviceService: DeviceService) {
  };

  new_value: number;
  log_message: string;

  ngOnInit(): void {
    this.new_value = this.controlUnit.current;
  }

  //TODO Überarbeiten Sie diese Klasse. Lesen Sie die Daten für das Diagramm aus dem SessionStorage aus und passen Sie die onSubmit Funktion an.

  /**
   * Liest den neuen Wert des Steuerungselements aus und leitet diesen an die REST-Schnittstelle weiter
   */
  onSubmit(): void {
    //TODO Lesen Sie die eingebenen Daten aus und verarbeiten Sie diese über die REST-Schnittstelle

    let time = new Date();

    let _lineChartData: Array<any> = Object.assign({}, this.lineChartData);
    _lineChartData[0].data.push(this.new_value);
    this.lineChartLabels.push(time.toLocaleDateString() + " " + time.toLocaleTimeString());
    this.lineChartData = _lineChartData;


    if (this.log_message != null) {
      this.log_message += "\n";
    } else {
      this.log_message = "";
    }
    this.log_message += new Date().toLocaleString() + ": " + this.controlUnit.current + " -> " + this.new_value;
    this.controlUnit.log = this.log_message;
    this.controlUnit.current = this.new_value;
  }

  public lineChartData: Array<any> = [
    {data: [], label: 'Verlauf'}
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Array<any> = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
}



