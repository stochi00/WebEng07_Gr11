import {Component} from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'big-smart-home-app',
    templateUrl: '../views/options.html'
})
export class OptionsComponent {
    public constructor(private titleService: Title ) {
        titleService.setTitle("BIG Smart Home - Optionen");
    }
}
