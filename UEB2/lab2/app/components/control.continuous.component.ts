import {Component, Input, AfterViewInit} from '@angular/core';
import {ControlUnit} from "../model/controlUnit";
import {DatePipe} from "@angular/common";

@Component({
    moduleId: module.id,
    selector: 'control-continuous',
    templateUrl: '../views/controlcontinuous.html'
})

export class ControlContinuous{
    @Input() controlunit: ControlUnit;
    log:LogEntry[] = [];

    chartLabels:string[] = ['Verlauf'];
    charData:number[] = [];
    chartType:string = 'line';

    ngAfterViewInit() {
        this.charData = new Array(this.controlunit.values.length);
    }

    setValue(value: number){
        this.log.push(new LogEntry(this.controlunit.current, value));
        this.controlunit.current=value;


        this.charData.push(value);
        this.charData = this.charData.slice();
    }

    logToString(): string {
        var history: string = "";

        for (var i = 0; i < this.log.length; i++) {

            var element = this.log[i];
            history += element + "\n";
        }

        return history;
    }
}

class LogEntry {
    datepipe: DatePipe;
    datetime: Date;
    oldvalue: any;
    newvalue: any;


    public constructor(oldvalue: any, newvalue: any){

        this.datepipe = new DatePipe('DE-de');
        this.datetime = new Date();
        this.oldvalue = oldvalue;
        this.newvalue = newvalue;
    }

    toString() :string
    {
        return this.datepipe.transform(this.datetime,"dd.MM.yyyy hh:mm:ss") + " " + " " + this.oldvalue + " -> " + this.newvalue;
    }
}