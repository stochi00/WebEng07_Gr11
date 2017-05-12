import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-overview',
  templateUrl: '../views/overview.html'
})
export class OverviewComponent {

  isAddDevice: boolean = false;

  addDevice() {
    this.isAddDevice = true;
  }

  closeAddDeviceWindow(){
    this.isAddDevice = false;
  }
}
